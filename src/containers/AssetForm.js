import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { AutoComplete, RadioButton, RadioButtonGroup, TextField } from 'material-ui';
import _ from 'underscore'
import config from '../config';
import { AssetFormHeader, CheckboxGroup, YesNoChoice } from '../components'

const ENDPOINT_SEARCH = config.ENDPOINT_LOOKUP + 'search';

const ENDPOINT_PEOPLE = config.ENDPOINT_LOOKUP + 'people/crsid/';

const ACCESS_TOKEN = 'P9FvKfO--eH4_RST3Go4DIrYcjejlL9AU977FThvyMs.sgVg-pvX7osqaMyQNPb5jPnMPW-Xtsfyp3re7lsl5Xk';

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

/*
  Renders the form for the creation/editing of an Asset.
  */
class AssetForm extends Component {

  constructor() {
    super();

    this.lookup = _.debounce(this.lookup, 200);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: "",
      department: "",
      purpose: "",
      research: null,
      owner: null,
      private: null,
      personal_data: null,
      data_subject: [],
      data_category: [],
      recipients_category: "",
      recipients_outside_eea: "",
      retention: null,
      retention_other: "",
      risk_type: [],
      storage_location: "",
      storage_format: [""],
      paper_storage_security: [],
      digital_storage_security: [],
      // non-asset state
      lookup_results: [],
      owner_name: ""
    }
  }

  fetch(url, options, cb) {
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

  fetchOwnerName() {
    this.fetch(ENDPOINT_PEOPLE + this.state.owner, {
      headers: new Headers({
        'Authorization': 'Bearer ' + ACCESS_TOKEN
      })
    }, data => {
      this.setState({owner_name: data.visibleName})
    });
  }

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

  handleChange(name, value) {
    // FIXME can't remove owner
    let state = {};
    state[name] = value;
    this.setState(state);
  }

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

  handleUpdateInput(searchText) {
    this.setState({
      owner_name: searchText
    });
    this.lookup(searchText);
  }

  // FIXME (include CRSID in display name)
  lookup(searchText) {
    let self = this;
    this.fetch(ENDPOINT_SEARCH + "?limit=10&query=" + encodeURIComponent(searchText), {
      headers: new Headers({
        'Authorization': 'Bearer ' + ACCESS_TOKEN
      })
    }, data => self.setState({lookup_results: data.results}));
  }

  render() {
    return (
      <div>
        <AssetFormHeader
          onClick={() => this.handleSave()}
          title={this.props.match.url === '/asset/create' ? 'Create new asset' : 'Editing: ' + this.state.name}
        />

        <div className="App-main">

          <TextField
            hintText="Asset name"
            value={this.state.name}
            onChange={(e, value) => this.handleChange('name', value)}
          />

          <br/>

          <TextField
            hintText="Asset department"
            value={this.state.department}
            onChange={(e, value) => this.handleChange('department', value)}
          />

          <br/>

          <TextField
            hintText="Purpose of holding this asset"
            value={this.state.purpose}
            onChange={(e, value) => this.handleChange('purpose', value)}
          />

          <br/><br/>

          <span>Is this for research purposes?</span>
          <YesNoChoice name="research" value={this.state.research} onChange={this.handleChange} />
          <AutoComplete
            disabled={!this.state.research}
            hintText="Principle Investigator"
            searchText={this.state.owner_name}
            filter={AutoComplete.noFilter}
            dataSource={this.state.lookup_results}
            dataSourceConfig={{text: 'visibleName', value: 'identifier.value'}}
            onUpdateInput={(searchText) => this.handleUpdateInput(searchText)}
            onNewRequest={(chosenRequest, index) => this.setState({owner: chosenRequest.identifier.value})}
          />

          <br/><br/>

          <span>Is this data private to the department?</span>
          <YesNoChoice name="private" value={this.state.private} onChange={this.handleChange} />

          <br/>

          <span>Does this asset hold any Personal Data?</span>
          <YesNoChoice name="personal_data" value={this.state.personal_data} onChange={this.handleChange} />

          <br/>

          <span>Who does this Personal Data belong to?</span>
          <CheckboxGroup
            labels={DATA_SUBJECT_LABELS}
            values={this.state.data_subject}
            onChange={(value) => this.handleChange('data_subject', value)}
          />

          <br/>

          <span>What kind of personal data is held?</span>
          <CheckboxGroup
            labels={DATA_CATEGORY_LABELS}
            values={this.state.data_category}
            onChange={(value) => this.handleChange('data_category', value)}
          />

          <br/>

          <TextField
            hintText="Who is the asset shared with?"
            value={this.state.recipients_category}
            onChange={(e, value) => this.handleChange('recipients_category', value)}
          />

          <br/>

          <TextField
            hintText="Is the asset shared outside of the EEA? If so, to whom?"
            value={this.state.recipients_outside_eea}
            onChange={(e, value) => this.handleChange('recipients_outside_eea', value)}
            style={{ width: 400 }}
          />

          <br/><br/>

          <span>How long will this asset be retained for?</span>
          <RadioButtonGroup
            name="retention"
            valueSelected={this.state.retention}
            onChange={(e, value) => this.handleChange('retention', value)}
          >
            <RadioButton value="<=1" label="Less than 1 year"/>
            <RadioButton value=">1,<=5" label="1 - 5 years"/>
            <RadioButton value=">5,<=10" label="6 - 10 years"/>
            <RadioButton value=">10,<=75" label="10 - 75 years"/>
            <RadioButton value="forever" label="Forever"/>
            <RadioButton value="other" label="Other"/>
          </RadioButtonGroup>
          <TextField
            hintText="Other retention period"
            disabled={this.state.retention !== 'other'}
            value={this.state.retention_other}
            onChange={(e, value) => this.handleChange('retention_other', value)}
          />

          <br/><br/>

          <span>What are the risks of holding this information asset?</span>
          <CheckboxGroup
            labels={RISK_TYPE_LABELS}
            values={this.state.risk_type}
            onChange={(value) => this.handleChange('risk_type', value)}
          />

          <br/>

          <TextField
            hintText="Where is the asset stored?"
            value={this.state.storage_location}
            onChange={(e, value) => this.handleChange('storage_location', value)}
          />

          <br/><br/>

          <span>What format is the asset stored in?</span>
          <RadioButtonGroup
            name="storage_format"
            valueSelected={this.state.storage_format.sort().toString()}
            onChange={(event, value) => this.setState({storage_format: value.split(',')})}
            style={{ display: 'flex' }}
          >
            <RadioButton value="digital" label="Digital" style={{ paddingRight: "20px", width: 'auto' }} />
            <RadioButton value="paper" label="Paper" style={{ paddingRight: "20px", width: 'auto' }} />
            <RadioButton value="digital,paper" label="Both" style={{ width: 'auto' }} />
          </RadioButtonGroup>

          <span>What are the risks of holding this information asset?</span>
          <CheckboxGroup
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

const RoutedAssetForm = (props) => (
  <Route path="/asset/:asset"
         render={(routeProps) => <AssetForm handleMessage={props.handleMessage.bind(this)} {...routeProps}/>} />
);

export default RoutedAssetForm
