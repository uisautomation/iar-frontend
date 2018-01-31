import React, { Component } from 'react'
import { AutoComplete, RadioButton, RadioButtonGroup, TextField } from 'material-ui';
import _ from 'underscore'
import config from '../config';
import { AssetFormHeader, CheckboxGroup, BooleanChoice } from '../components'

const ENDPOINT_SEARCH = config.ENDPOINT_LOOKUP + 'search';

const ENDPOINT_PEOPLE = config.ENDPOINT_LOOKUP + 'people/crsid/';

const ACCESS_TOKEN = 'THIS IS JUST A PLACEHOLDER';

const DATA_SUBJECT_LABELS = [
  {value: "staff", label: "Staff & applicants"},
  {value: "students", label: "Students & applicants"},
  {value: "alumni", label: "Alumni"},
  {value: "research", label: "Research participants"},
  {value: "patients", label: "Patients"},
  {value: "supplier", label: "Suppliers"},
  {value: "public", label: "Members of the public"},
];

const DATA_CATEGORY_LABELS = [
  {value: 'education', label: "Education"},
  {value: 'racial', label: "Racial or ethnic origin"},
  {value: 'employment', label: "Employment"},
  {value: 'political', label: "Political opinions"},
  {value: 'financial', label: "Financial"},
  {value: 'unions', label: "Trade union membership"},
  {value: 'social', label: "Lifestyle and social circumstances"},
  {value: 'religious', label: "Religious or similar beliefs"},
  {value: 'visual', label: "Visual images"},
  {value: 'health', label: "Physical or mental health details"},
  {value: 'research', label: "Research data"},
  {value: 'sexual', label: "Sexual life and orientation"},
  {value: 'medical', label: "Medical records"},
  {value: 'genetic', label: "Genetic information"},
  {value: 'children', label: "Data about children 16"},
  {value: 'biometric', label: "Biometric information"},
  {value: 'criminal', label: "Criminal proceedings"},
];

const RISK_TYPE_LABELS = [
  {value: 'financial', label: "The University would be exposed to financial loss by disclosing this information"},
  {value: 'operational', label: "Damage or loss of this information would impact core day-to-day operations."},
  {value: 'safety', label: "Staff or students would be exposed to personal danger if this information was disclosed."},
  {value: 'compliance', label: "The University would be compliant with all the necessary laws and regulations related to holding this information."},
  {value: 'reputational', label: "The University would receive significant negative publicity"},
];

const DIGITAL_STORAGE_SECURITY_LABELS = [
  {value: 'pwd_controls', label: "Password controls"},
  {value: 'acl', label: "Access control lists"},
  {value: 'backup', label: "Backup"},
  {value: 'encryption', label: "Encryption"},
];

const PAPER_STORAGE_SECURITY_LABELS = [
  {value: 'locked_cabinet', label: "Locked filing cabinet"},
  {value: 'safe', label: "Safe"},
  {value: 'locked_room', label: "Locked room"},
  {value: 'locked_building', label: "Locked building"},
];

const retentionStyle = {
  borderWidth: '1px 1px 0',
  borderStyle: 'solid',
  borderColor: '#d1d1d1',
  padding: '10px 20px'
};

const storageFormatGroupStyle = {
  display: 'flex',
  borderLeft: '1px solid #d1d1d1'
};

const storageFormatButtonStyle = {
  width: 'auto',
  borderWidth: '1px 1px 1px 0',
  borderStyle: 'solid',
  borderColor: '#d1d1d1',
  padding: "10px 20px"
};

/*
  Renders the form for the creation/editing of an Asset.
  */
class AssetForm extends Component {

  constructor() {
    super();

    this.fetchMatchingUsers = _.debounce(this.fetchMatchingUsers, 200);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      // asset state
      name: null,
      department: null,
      purpose: null,
      research: null,
      owner: null,
      private: null,
      personal_data: null,
      data_subject: [],
      data_category: [],
      recipients_category: null,
      recipients_outside_eea: null,
      retention: null,
      retention_other: null,
      risk_type: [],
      storage_location: null,
      storage_format: [],
      paper_storage_security: [],
      digital_storage_security: [],

      // non-asset state

      // the list of matching users returned from lookup
      matchingUsers: [],
      // the selected owner's full name
      ownerName: ""
    }
  }

  /*
  Wrapper for fetch() that handles errors / unmarshalls JSON
   */
  fetch(url, options, cb) {
    if (options.headers) {
      options.headers.append('Authorization', 'Bearer ' + ACCESS_TOKEN);
    } else {
      options['headers'] = new Headers({
        'Authorization': 'Bearer ' + ACCESS_TOKEN
      });
    }
    fetch(url, options).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        this.props.handleMessage('Network Error: ' + response.statusText)
      }
    }).then(data => data && cb(data)).catch(
        error => this.props.handleMessage('Network Error: ' + error)
    );
  }

  /*
  If the form is in edit mode - fetch the asset (and the owner's name - if there is one)
   */
  componentDidMount() {
    if (this.props.match.url !== '/asset/create') {
      this.fetch(config.ENDPOINT_ASSETS + this.props.match.params.asset + '/', {}, data => {
        this.setState(data);
        if (this.state.owner) {
          this.fetchOwnerName();
        }
      });
    }
  }

  /*
  Fetch the owner's name for the lookup API.
   */
  fetchOwnerName() {
    this.fetch(ENDPOINT_PEOPLE + this.state.owner, {}, data => {
      this.setState({ownerName: data.visibleName})
    });
  }

  /*
  As the user types into the owner AutoComplete the ownerName is updated and a list of users
  matching the searchText is fetched.
  Deleting all text is detected and the owner field is cleared to allow the deleting of an owner.
   */
  handleOwnerUpdateInput(searchText) {
    let newState = {
      ownerName: searchText
    };
    if (!searchText) {
      newState['owner'] = null;
    }
    this.setState(newState);
    this.fetchMatchingUsers(searchText);
  }

  /*
  Fetches a list of users matching the searchText from the lookup api.
  This function is debounced to reduce the number of remote calls.
   */
  fetchMatchingUsers(searchText) {
    // TODO (include CRSID in display name)
    let self = this;
    this.fetch(
      ENDPOINT_SEARCH + "?limit=10&query=" + encodeURIComponent(searchText), {},
      data => self.setState({matchingUsers: data.results})
    );
  }

  /*
  Function trigger by the onChange of most inputs - updates state.
   */
  handleChange(name, value) {
    let state = {};
    state[name] = value === "" ? null : value;
    this.setState(state);
  }

  /*
  Either creates a new asset or updates an existing one depending on the mode of the form.
   */
  handleSave() {
    let method = 'post';
    let endpoint = config.ENDPOINT_ASSETS;
    if (this.props.match.url !== '/asset/create') {
      method = 'put';
      endpoint += this.props.match.params.asset + '/';
    }
    this.fetch(endpoint, {
      method: method,
      body: JSON.stringify(this.state),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }, (data) => {
      this.props.handleMessage('"' + data.name + '" saved.');
      this.props.history.push("/")
    });
  }

  render() {
    return (
      <div className="App-main">
        <AssetFormHeader
          onClick={() => this.handleSave()}
          title={this.props.match.url === '/asset/create' ? 'Create new asset' : 'Editing: ' + this.state.name}
        />

        <div>

          <div className="App-grid-container App-grid-2">
            <div className="App-grid-item">
              <TextField
                hintText="Asset name"
                value={this.state.name === null ? "" : this.state.name}
                onChange={(e, value) => this.handleChange('name', value)}
              />
            </div>
            <div className="App-grid-item">
              <TextField
                hintText="Asset department"
                value={this.state.department === null ? "" : this.state.department}
                onChange={(e, value) => this.handleChange('department', value)}
              />
            </div>
            <div className="App-grid-item">
              <TextField
                hintText="Purpose of holding this asset"
                value={this.state.purpose === null ? "" : this.state.purpose}
                onChange={(e, value) => this.handleChange('purpose', value)}
              />
            </div>
            <div className="App-grid-item"/>
            <div className="App-grid-item">
              Is this for research purposes?
            </div>
            <div className="App-grid-item">
              <BooleanChoice name="research" value={this.state.research} onChange={this.handleChange} />
            </div>
            <div className="App-grid-item">
              <AutoComplete
                disabled={!this.state.research}
                hintText="Principle Investigator"
                searchText={this.state.ownerName}
                filter={AutoComplete.noFilter}
                dataSource={this.state.matchingUsers}
                dataSourceConfig={{text: 'visibleName', value: 'identifier.value'}}
                onUpdateInput={(searchText) => this.handleOwnerUpdateInput(searchText)}
                onNewRequest={(chosenRequest, index) => this.setState({owner: chosenRequest.identifier.value})}
              />
            </div>
            <div className="App-grid-item"/>
            <div className="App-grid-item">
              Is this data private to the department?
            </div>
            <div className="App-grid-item">
              <BooleanChoice name="private" value={this.state.private} onChange={this.handleChange} />
            </div>
            <div className="App-grid-item">
              Does this asset hold any Personal Data?
            </div>
            <div className="App-grid-item">
              <BooleanChoice name="personal_data" value={this.state.personal_data} onChange={this.handleChange} />
            </div>
          </div>

          <CheckboxGroup
            title='Who does this Personal Data belong to?'
            labels={DATA_SUBJECT_LABELS}
            values={this.state.data_subject}
            onChange={(value) => this.handleChange('data_subject', value)}

          />

          <CheckboxGroup
            title='What kind of personal data is held?'
            labels={DATA_CATEGORY_LABELS}
            values={this.state.data_category}
            onChange={(value) => this.handleChange('data_category', value)}
            columns="2"
          />

          <div className="App-grid-container App-grid-2">
            <div className="App-grid-item">
              <TextField
                hintText="Who is the asset shared with?"
                value={this.state.recipients_category === null ? "" : this.state.recipients_category}
                onChange={(e, value) => this.handleChange('recipients_category', value)}
              />
            </div>
            <div className="App-grid-item">
              <TextField
                hintText="Is the asset shared outside of the EEA? If so, to whom?"
                value={this.state.recipients_outside_eea === null ? "" : this.state.recipients_outside_eea}
                onChange={(e, value) => this.handleChange('recipients_outside_eea', value)}
                style={{ width: 400 }}
              />
            </div>
          </div>

          <div style={{padding: '20px 0'}}>How long will this asset be retained for?</div>
          <div className="App-grid-container App-grid-1">
            <RadioButtonGroup
              name="retention"
              valueSelected={this.state.retention}
              onChange={(e, value) => this.handleChange('retention', value)}
            >
              <RadioButton value="<=1" label="Less than 1 year" style={retentionStyle} />
              <RadioButton value=">1,<=5" label="1 - 5 years" style={retentionStyle} />
              <RadioButton value=">5,<=10" label="6 - 10 years" style={retentionStyle} />
              <RadioButton value=">10,<=75" label="10 - 75 years" style={retentionStyle} />
              <RadioButton value="forever" label="Forever" style={retentionStyle} />
              <RadioButton value="other" label="Other" style={{...retentionStyle, borderWidth: '1px'}} />
            </RadioButtonGroup>
          </div>

          <div className="App-grid-container App-grid-1">
            <div className="App-grid-item">
              <TextField
                hintText="Other retention period"
                disabled={this.state.retention !== 'other'}
                value={this.state.retention_other === null ? "" : this.state.retention_other}
                onChange={(e, value) => this.handleChange('retention_other', value)}
              />
            </div>
          </div>

          <CheckboxGroup
            title='What are the risks of holding this information asset?'
            labels={RISK_TYPE_LABELS}
            values={this.state.risk_type}
            onChange={(value) => this.handleChange('risk_type', value)}
          />

          <div className="App-grid-container App-grid-1">
            <div className="App-grid-item">
              <TextField
                hintText="Where is the asset stored?"
                value={this.state.storage_location === null ? "" : this.state.storage_location}
                onChange={(e, value) => this.handleChange('storage_location', value)}
              />
            </div>
          </div>

          <div className="App-grid-container App-grid-2">
            <div className="App-grid-item">
              What format is the asset stored in?
            </div>
            <div className="App-grid-item">
              <RadioButtonGroup
                name="storage_format"
                valueSelected={this.state.storage_format.sort().toString()}
                onChange={(event, value) => this.setState({storage_format: value.split(',')})}
                style={storageFormatGroupStyle}
              >
                <RadioButton value="digital" label="Digital" style={storageFormatButtonStyle} />
                <RadioButton value="paper" label="Paper" style={storageFormatButtonStyle} />
                <RadioButton value="digital,paper" label="Both" style={storageFormatButtonStyle} />
              </RadioButtonGroup>
            </div>
          </div>

          <CheckboxGroup
            title='What are the risks of holding this information asset?'
            labels={DIGITAL_STORAGE_SECURITY_LABELS}
            values={this.state.digital_storage_security}
            onChange={(value) => this.handleChange('digital_storage_security', value)}
            disabled={this.state.storage_format.indexOf("digital") === -1}
          />
          <CheckboxGroup
            labels={PAPER_STORAGE_SECURITY_LABELS}
            values={this.state.paper_storage_security}
            onChange={(value) => this.handleChange('paper_storage_security', value)}
            disabled={this.state.storage_format.indexOf("paper") === -1}
          />
        </div>
      </div>
    )
  }
}

export default AssetForm
