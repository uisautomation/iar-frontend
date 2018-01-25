import React, { Component } from 'react'
import { AssetFormHeader } from '../components'
import { AutoComplete, Checkbox, RadioButton, RadioButtonGroup, TextField } from 'material-ui';

const fruit = [
  'Apple', 'Apricot', 'Avocado',
  'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
  'Boysenberry', 'Blood Orange',
  'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
  'Coconut', 'Cranberry', 'Clementine',
  'Damson', 'Date', 'Dragonfruit', 'Durian',
  'Elderberry',
  'Feijoa', 'Fig',
  'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
  'Honeydew', 'Huckleberry',
  'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
  'Kiwi fruit', 'Kumquat',
  'Lemon', 'Lime', 'Loquat', 'Lychee',
  'Nectarine',
  'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
  'Olive', 'Orange',
  'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
  'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
  'Quince',
  'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
  'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
  'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
  'Ugli fruit',
  'Watermelon',
];

/*
  Renders the form for the creation/editing of an Asset.
  */
class AssetForm extends Component {

  constructor() {
    super();
    this.state = {
      name: "",
      department: "",
      purpose: "",
      research: null,
      owner: null, // map
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
    };
  }

  handleChange = (name, value) => {
    console.log(this.state);
    let state = {};
    state[name] = value;
    this.setState(state);
  };

  updateCheck = (name, value) => {
    let index = this.state[name].indexOf(value);
    if (index === -1) {
      this.state[name].push(value);
    } else {
      this.state[name].splice(index, 1);
    }
    let state = {};
    state[name] = this.state[name];
    this.setState(state);
  };

  handleSave() {
    fetch('http://localhost:8000/assets/', {
      method: 'post',
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

  render() {
    return (
      <div>
        <AssetFormHeader
          onClick={() => this.handleSave()}
          title={this.props.match.url === '/asset/create' ? 'Create new asset' : 'Editing: Some asset'}
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
            defaultSelected={this.state.research}
            onChange={(e, value) => this.handleChange('research', value)}
            style={{ display: 'flex' }}
          >
            <RadioButton value={true} label="yes" style={{ paddingRight: "20px", width: 'auto' }} />
            <RadioButton value={false} label="no" style={{ width: 'auto' }} />
          </RadioButtonGroup>
          <AutoComplete
            disabled={!this.state.research}
            hintText="Principle Investigator"
            filter={AutoComplete.fuzzyFilter}
            dataSource={fruit}
            maxSearchResults={5}
          />

          <br/><br/>

          <span>Is this data private to the department?</span>
          <RadioButtonGroup
            name="private"
            defaultSelected={this.state.private}
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
            defaultSelected={this.state.personal_data}
            onChange={(e, value) => this.handleChange('personal_data', value)}
            style={{ display: 'flex' }}
          >
            <RadioButton value={true} label="yes" style={{ width: 'auto', paddingRight: "20px" }} />
            <RadioButton value={false} label="no" style={{ width: 'auto' }} />
          </RadioButtonGroup>

          <br/>

          <span>Who does this Personal Data belong to?</span>
          <Checkbox
            label="Staff & applicants"
            checked={this.state.data_subject.indexOf('staff') !== -1}
            onCheck={() => this.updateCheck('data_subject', 'staff')}
          />
          <Checkbox
            label="Students & applicants"
            checked={this.state.data_subject.indexOf('students') !== -1}
            onCheck={() => this.updateCheck('data_subject', 'students')}
          />
          <Checkbox
            label="Alumni"
            checked={this.state.data_subject.indexOf('alumni') !== -1}
            onCheck={() => this.updateCheck('data_subject', 'alumni')}
          />
          <Checkbox
            label="Research participants"
            checked={this.state.data_subject.indexOf('research') !== -1}
            onCheck={() => this.updateCheck('data_subject', 'research')}
          />
          <Checkbox
            label="Patients"
            checked={this.state.data_subject.indexOf('patients') !== -1}
            onCheck={() => this.updateCheck('data_subject', 'patients')}
          />
          <Checkbox
            label="Suppliers"
            checked={this.state.data_subject.indexOf('supplier') !== -1}
            onCheck={() => this.updateCheck('data_subject', 'supplier')}
          />
          <Checkbox
            label="Members of the public"
            checked={this.state.data_subject.indexOf('public') !== -1}
            onCheck={() => this.updateCheck('data_subject', 'public')}
          />

          <br/>

          <span>What kind of personal data is held?</span>
          <Checkbox
            label="Education"
            checked={this.state.data_category.indexOf('education') !== -1}
            onCheck={() => this.updateCheck('data_category', 'education')}
          />
          <Checkbox
            label="Racial or ethnic origin"
            checked={this.state.data_category.indexOf('racial') !== -1}
            onCheck={() => this.updateCheck('data_category', 'racial')}
          />
          <Checkbox
            label="Employment"
            checked={this.state.data_category.indexOf('employment') !== -1}
            onCheck={() => this.updateCheck('data_category', 'employment')}
          />
          <Checkbox
            label="Political opinions"
            checked={this.state.data_category.indexOf('political') !== -1}
            onCheck={() => this.updateCheck('data_category', 'political')}
          />
          <Checkbox
            label="Financial"
            checked={this.state.data_category.indexOf('financial') !== -1}
            onCheck={() => this.updateCheck('data_category', 'financial')}
          />
          <Checkbox
            label="Trade union membership"
            checked={this.state.data_category.indexOf('unions') !== -1}
            onCheck={() => this.updateCheck('data_category', 'unions')}
          />
          <Checkbox
            label="Lifestyle and social circumstances"
            checked={this.state.data_category.indexOf('social') !== -1}
            onCheck={() => this.updateCheck('data_category', 'social')}
          />
          <Checkbox
            label="Religious or similar beliefs"
            checked={this.state.data_category.indexOf('religious') !== -1}
            onCheck={() => this.updateCheck('data_category', 'religious')}
          />
          <Checkbox
            label="Visual images"
            checked={this.state.data_category.indexOf('visual') !== -1}
            onCheck={() => this.updateCheck('data_category', 'visual')}
          />
          <Checkbox
            label="Physical or mental health details"
            checked={this.state.data_category.indexOf('health') !== -1}
            onCheck={() => this.updateCheck('data_category', 'health')}
          />
          <Checkbox
            label="Research data"
            checked={this.state.data_category.indexOf('research') !== -1}
            onCheck={() => this.updateCheck('data_category', 'research')}
          />
          <Checkbox
            label="Sexual life and orientation"
            checked={this.state.data_category.indexOf('sexual') !== -1}
            onCheck={() => this.updateCheck('data_category', 'sexual')}
          />
          <Checkbox
            label="Medical records"
            checked={this.state.data_category.indexOf('medical') !== -1}
            onCheck={() => this.updateCheck('data_category', 'medical')}
          />
          <Checkbox
            label="Genetic information"
            checked={this.state.data_category.indexOf('genetic') !== -1}
            onCheck={() => this.updateCheck('data_category', 'genetic')}
          />
          <Checkbox
            label="Data about children 16"
            checked={this.state.data_category.indexOf('children') !== -1}
            onCheck={() => this.updateCheck('data_category', 'children')}
          />
          <Checkbox
            label="Biometric information"
            checked={this.state.data_category.indexOf('biometric') !== -1}
            onCheck={() => this.updateCheck('data_category', 'biometric')}
          />
          <Checkbox
            label="Criminal proceedings, outcomes and sentences"
            checked={this.state.data_category.indexOf('criminal') !== -1}
            onCheck={() => this.updateCheck('data_category', 'criminal')}
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
            defaultSelected={this.state.retention}
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
          <Checkbox
            label="The University would be exposed to financial loss by disclosing this information, and/or activities relating to it."
            checked={this.state.risk_type.indexOf('financial') !== -1}
            onCheck={() => this.updateCheck('risk_type', 'financial')}
          />
          <Checkbox
            label="Damage or loss of this information would impact core day-to-day operations."
            checked={this.state.risk_type.indexOf('operational') !== -1}
            onCheck={() => this.updateCheck('risk_type', 'operational')}
          />
          <Checkbox
            label="Staff or students would be exposed to personal danger if this information was disclosed."
            checked={this.state.risk_type.indexOf('safety') !== -1}
            onCheck={() => this.updateCheck('risk_type', 'safety')}
          />
          <Checkbox
            label="The University would be compliant with all the necessary laws and regulations related to holding this information."
            checked={this.state.risk_type.indexOf('compliance') !== -1}
            onCheck={() => this.updateCheck('risk_type', 'compliance')}
          />
          <Checkbox
            label="The University would receive significant negative publicity, high-profile criticism or be exposed to a lawsuit if this information became public."
            checked={this.state.risk_type.indexOf('reputational') !== -1}
            onCheck={() => this.updateCheck('risk_type', 'reputational')}
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
            defaultSelected={this.state.storage_format.sort().toString()}
            onChange={(event, value) => this.setState({storage_format: value.split(',')})}
            style={{ display: 'flex' }}
          >
            <RadioButton value="digital" label="Digital" style={{ paddingRight: "20px", width: 'auto' }} />
            <RadioButton value="paper" label="Paper" style={{ paddingRight: "20px", width: 'auto' }} />
            <RadioButton value="digital,paper" label="Both" style={{ width: 'auto' }} />
          </RadioButtonGroup>

          <span>What are the risks of holding this information asset?</span>
          <Checkbox
            label="Password controls"
            disabled={this.state.storage_format.indexOf("digital") === -1}
            checked={this.state.digital_storage_security.indexOf('pwd_controls') !== -1}
            onCheck={() => this.updateCheck('digital_storage_security', 'pwd_controls')}
          />
          <Checkbox
            label="Access control lists"
            disabled={this.state.storage_format.indexOf("digital") === -1}
            checked={this.state.digital_storage_security.indexOf('acl') !== -1}
            onCheck={() => this.updateCheck('digital_storage_security', 'acl')}
          />
          <Checkbox
            label="Backup"
            disabled={this.state.storage_format.indexOf("digital") === -1}
            checked={this.state.digital_storage_security.indexOf('backup') !== -1}
            onCheck={() => this.updateCheck('digital_storage_security', 'backup')}
          />
          <Checkbox
            label="Encryption"
            disabled={this.state.storage_format.indexOf("digital") === -1}
            checked={this.state.digital_storage_security.indexOf('encryption') !== -1}
            onCheck={() => this.updateCheck('digital_storage_security', 'encryption')}
          />
          <Checkbox
            label="Locked filing cabinet"
            disabled={this.state.storage_format.indexOf("paper") === -1}
            checked={this.state.paper_storage_security.indexOf('locked_cabinet') !== -1}
            onCheck={() => this.updateCheck('paper_storage_security', 'locked_cabinet')}
          />
          <Checkbox
            label="Safe"
            disabled={this.state.storage_format.indexOf("paper") === -1}
            checked={this.state.paper_storage_security.indexOf('safe') !== -1}
            onCheck={() => this.updateCheck('paper_storage_security', 'safe')}
          />
          <Checkbox
            label="Locked room"
            disabled={this.state.storage_format.indexOf("paper") === -1}
            checked={this.state.paper_storage_security.indexOf('locked_room') !== -1}
            onCheck={() => this.updateCheck('paper_storage_security', 'locked_room')}
          />
          <Checkbox
            label="Locked building"
            disabled={this.state.storage_format.indexOf("paper") === -1}
            checked={this.state.paper_storage_security.indexOf('locked_building') !== -1}
            onCheck={() => this.updateCheck('paper_storage_security', 'locked_building')}
          />
        </div>
      </div>
    )
  }
}

export default AssetForm
