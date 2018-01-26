import React, { Component } from 'react'
import { AssetFormHeader, CheckboxGroup } from '../components'
import { AutoComplete, Checkbox, RadioButton, RadioButtonGroup, TextField } from 'material-ui';
import _ from 'underscore'

const ENDPOINT_ASSETS = 'http://localhost:8000/assets/';

const ENDPOINT_SEARCH = 'http://localhost:8080/search';

const ENDPOINT_PEOPLE = 'http://localhost:8080/people/crsid/';

const ACCESS_TOKEN = '5d4hVDHqpfddZSdmLK5qmk111rWqEJ_jZZyTslqROEI.vKZ5iO5_5_yz7dwdHTZH4riBfXbJWEfa8bWmUqxZ8tE';

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

  componentDidMount() {
    if (this.props.match.url !== '/asset/create') {
      let self = this;
      fetch(ENDPOINT_ASSETS + this.props.match.params.asset + '/').then(
        response => response.json()
      ).then(data => {
        self.setState(data);
        if (self.state.owner) {
          fetch(ENDPOINT_PEOPLE + self.state.owner, {
            headers: new Headers({
            'Authorization': 'Bearer ' + ACCESS_TOKEN
            })
          }).then(
            response => response.json()
          ).then(data => {
            self.setState({owner_name: data.visibleName})
          }).catch(
            // FIXME handle error
            error => console.error('error:', error)
          );
        }
      }).catch(
        // FIXME handle error
        error => console.error('error:', error)
      );
    }
  }

  handleChange(name, value) {
    let state = {};
    state[name] = value;
    this.setState(state);
  }

  updateCheck(name, value) {
    let index = this.state[name].indexOf(value);
    if (index === -1) {
      this.state[name].push(value);
    } else {
      this.state[name].splice(index, 1);
    }
    let state = {};
    state[name] = this.state[name];
    this.setState(state);
  }

  handleSave() {
    let method = 'post';
    let endpoint = ENDPOINT_ASSETS;
    if (this.props.match.url !== '/asset/create') {
      method = 'put';
      endpoint += this.props.match.params.asset + '/';
    }
    fetch(endpoint, {
      method: method,
      body: JSON.stringify(this.state),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => {
      // FIXME test for error
      return response.json();
    }).then(function(data) {
      console.log(data);
      // FIXME snackbar required
      window.location.href = '/'
    }).catch(error => {
      console.error('Error:', error)
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
    fetch(ENDPOINT_SEARCH + "?limit=10&query=" + encodeURIComponent(searchText), {
      headers: new Headers({
        'Authorization': 'Bearer ' + ACCESS_TOKEN
      })
    }).then(
      response => response.json()
    ).then(
      data => {self.setState({lookup_results: data.results})}
    ).catch(
      // FIXME handle error
      error => console.error('error:', error)
    );
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
          <RadioButtonGroup
            name="research"
            valueSelected={this.state.research}
            onChange={(e, value) => this.handleChange('research', value)}
            style={{ display: 'flex' }}
          >
            <RadioButton value={true} label="yes" style={{ paddingRight: "20px", width: 'auto' }} />
            <RadioButton value={false} label="no" style={{ width: 'auto' }} />
          </RadioButtonGroup>
          {/*
          <AutoComplete
            disabled={!this.state.research}
            hintText="Principle Investigator"
            searchText={this.state.owner_name}
            filter={AutoComplete.noFilter}
            dataSource={this.state.lookup_results}
            dataSourceConfig={{text: 'visibleName', value: 'identifier.value'}}
            onUpdateInput={(searchText) => this.handleUpdateInput(searchText)}
            onNewRequest={(chosenRequest, index) => this.setState({owner: chosenRequest.identifier.value})}
          />*/}

          <br/><br/>

          <span>Is this data private to the department?</span>
          <RadioButtonGroup
            name="private"
            valueSelected={this.state.private}
            onChange={(e, value) => this.handleChange('private', value)}
            style={{ display: 'flex' }}
          >
            <RadioButton value={true} label="yes" style={{ paddingRight: "20px", width: 'auto' }} />
            <RadioButton value={false} label="no" style={{ width: 'auto' }} />
          </RadioButtonGroup>

          <br/>

          <span>Does this asset hold any Personal Data?</span>
          <RadioButtonGroup
            name="personal_data"
            valueSelected={this.state.personal_data}
            onChange={(e, value) => this.handleChange('personal_data', value)}
            style={{ display: 'flex' }}
          >
            <RadioButton value={true} label="yes" style={{ width: 'auto', paddingRight: "20px" }} />
            <RadioButton value={false} label="no" style={{ width: 'auto' }} />
          </RadioButtonGroup>

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

export default AssetForm
