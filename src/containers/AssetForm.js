import React, { Component } from 'react'
import { RadioButton, RadioButtonGroup, TextField } from 'material-ui';
import config from '../config';
import { AssetFormHeader, BooleanChoice, CheckboxGroup, Lookup } from '../components'
import Page from '../containers/Page';
import { connect } from 'react-redux';
import { snackbarOpen } from '../redux/actions/snackbar';

const ACCESS_TOKEN = 'THIS IS A PLACEHOLDER';

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
  If the form is in edit mode - fetch the asset
   */
  componentDidMount() {
    if (this.props.match.url !== '/asset/create') {
      this.fetch(config.ENDPOINT_ASSETS + this.props.match.params.assetId + '/', {}, data => {
        this.setState(data);
      });
    }
  }

  /*
  Function trigger by the onChange of most inputs - updates state.
   */
  handleChange(event, value) {
    let state = {};
    state[event.target.name] = value === "" ? null : value;
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
      endpoint += this.props.match.params.assetId + '/';
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
      <Page>
        <AssetFormHeader
          onClick={() => this.handleSave()}
          title={this.props.match.url === '/asset/create' ? 'Create new asset' : 'Editing: ' + this.state.name}
        />

        <div>
          <div className="App-grid-container App-grid-2">
            <div className="App-grid-item">
              <TextField
                hintText="Asset name"
                name='name'
                value={this.state.name === null ? "" : this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="App-grid-item">
              <TextField
                hintText="Asset department"
                name='department'
                value={this.state.department === null ? "" : this.state.department}
                onChange={this.handleChange}
              />
            </div>
            <div className="App-grid-item">
              <TextField
                hintText="Purpose of holding this asset"
                name='purpose'
                value={this.state.purpose === null ? "" : this.state.purpose}
                onChange={this.handleChange}
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
              <Lookup
                disabled={!this.state.research}
                hintText="Principle Investigator"
                name="owner"
                value={this.state.owner}
                onChange={this.handleChange}
                fetch={this.fetch}
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
            name='data_subject'
            labels={DATA_SUBJECT_LABELS}
            values={this.state.data_subject}
            onChange={this.handleChange}
            disabled={!this.state.personal_data}
          />

          <CheckboxGroup
            title='What kind of personal data is held?'
            name='data_category'
            labels={DATA_CATEGORY_LABELS}
            values={this.state.data_category}
            onChange={this.handleChange}
            columns="2"
            disabled={!this.state.personal_data}
          />

          <div className="App-grid-container App-grid-2">
            <div className="App-grid-item">
              <TextField
                hintText="Who is the asset shared with?"
                name='recipients_category'
                value={this.state.recipients_category === null ? "" : this.state.recipients_category}
                onChange={this.handleChange}
                disabled={!this.state.personal_data}
              />
            </div>
            <div className="App-grid-item">
              <TextField
                hintText="Is the asset shared outside of the EEA? If so, to whom?"
                name='recipients_outside_eea'
                value={this.state.recipients_outside_eea === null ? "" : this.state.recipients_outside_eea}
                onChange={this.handleChange}
                disabled={!this.state.personal_data}
                style={{ width: 400 }}
              />
            </div>
          </div>

          <div style={{padding: '20px 0'}}>How long will this asset be retained for?</div>
          <div className="App-grid-container App-grid-1">
            <RadioButtonGroup
              name="retention"
              valueSelected={this.state.retention}
              onChange={this.handleChange}
            >
              <RadioButton disabled={!this.state.personal_data} style={retentionStyle}
                           value="<=1" label="Less than 1 year" />
              <RadioButton disabled={!this.state.personal_data} style={retentionStyle}
                           value=">1,<=5" label="1 - 5 years" />
              <RadioButton disabled={!this.state.personal_data} style={retentionStyle}
                           value=">5,<=10" label="6 - 10 years" />
              <RadioButton disabled={!this.state.personal_data} style={retentionStyle}
                           value=">10,<=75" label="10 - 75 years" />
              <RadioButton disabled={!this.state.personal_data} style={retentionStyle}
                           value="forever" label="Forever" />
              <RadioButton disabled={!this.state.personal_data} style={{...retentionStyle, borderWidth: '1px'}}
                           value="other" label="Other"  />
            </RadioButtonGroup>
          </div>

          <div className="App-grid-container App-grid-1">
            <div className="App-grid-item">
              <TextField
                hintText="Other retention period"
                name="retention_other"
                disabled={this.state.retention !== 'other'}
                value={this.state.retention_other === null ? "" : this.state.retention_other}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <CheckboxGroup
            title='What are the risks of holding this information asset?'
            name="risk_type"
            labels={RISK_TYPE_LABELS}
            values={this.state.risk_type}
            onChange={this.handleChange}
          />

          <div className="App-grid-container App-grid-1">
            <div className="App-grid-item">
              <TextField
                hintText="Where is the asset stored?"
                name="storage_location"
                value={this.state.storage_location === null ? "" : this.state.storage_location}
                onChange={this.handleChange}
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
            name="digital_storage_security"
            values={this.state.digital_storage_security}
            onChange={this.handleChange}
            disabled={this.state.storage_format.indexOf("digital") === -1}
          />
          <CheckboxGroup
            labels={PAPER_STORAGE_SECURITY_LABELS}
            name="paper_storage_security"
            values={this.state.paper_storage_security}
            onChange={this.handleChange}
            disabled={this.state.storage_format.indexOf("paper") === -1}
          />
        </div>
      </Page>
    )
  }
}

const mapDispatchToProps = { handleMessage: snackbarOpen };

export default connect(null, mapDispatchToProps)(AssetForm);
