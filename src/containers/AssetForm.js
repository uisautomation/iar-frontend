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
      name: null,
      department: null,
      purpose: null,
      research: null,
      owner: null,
      personal_data: null,
      private: null,
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
    };
  }

  render() {
    return (
      <div>
        <AssetFormHeader title={this.props.match.url === '/asset/create' ? 'Create new asset' : 'Editing: Some asset'} />

        <div className="App-main">

          <TextField hintText="Asset name" />

          <br/>

          <TextField hintText="Asset department" />

          <br/>

          <TextField hintText="Purpose of holding this asset" />

          <br/><br/>

          <Checkbox
            label="For research purposes?"
            onCheck={(event, isInputChecked) => this.setState({research: isInputChecked})}
          />
          <AutoComplete
            disabled={!this.state.research}
            hintText="Principle Investigator"
            filter={AutoComplete.fuzzyFilter}
            dataSource={fruit}
            maxSearchResults={5}
          />

          <br/><br/>

          <span>Does this asset hold any Personal Data?</span>
          <RadioButtonGroup name="personal_data" defaultSelected="yes" style={{ display: 'flex' }}>
            <RadioButton value="yes" label="true" style={{ paddingRight: "20px", width: 'auto' }} />
            <RadioButton value="no" label="false" style={{ width: 'auto' }} />
          </RadioButtonGroup>

          <br/>

          <span>It this data private to the department?</span>
          <RadioButtonGroup name="private" defaultSelected="yes" style={{ display: 'flex' }}>
            <RadioButton value="yes" label="true" style={{ paddingRight: "20px", width: 'auto' }} />
            <RadioButton value="no" label="false" style={{ width: 'auto' }} />
          </RadioButtonGroup>

          <br/>

          <span>Who does this Personal Data belong to?</span>
          <Checkbox label="Staff & applicants"/>
          <Checkbox label="Students & applicants"/>
          <Checkbox label="Alumni"/>
          <Checkbox label="Research participants"/>
          <Checkbox label="Patients"/>
          <Checkbox label="Suppliers"/>
          <Checkbox label="Members of the public"/>

          <br/>

          <span>What kind of personal data is held?</span>
          <Checkbox label="Education"/>
          <Checkbox label="Racial or ethnic origin"/>
          <Checkbox label="Employment"/>
          <Checkbox label="Political opinions"/>
          <Checkbox label="Financial"/>
          <Checkbox label="Trade union membership"/>
          <Checkbox label="Lifestyle and social circumstances"/>
          <Checkbox label="Religious or similar beliefs"/>
          <Checkbox label="Visual images"/>
          <Checkbox label="Physical or mental health details"/>
          <Checkbox label="Research data"/>
          <Checkbox label="Sexual life and orientation"/>
          <Checkbox label="Medical records"/>
          <Checkbox label="Genetic information"/>
          <Checkbox label="Data about children 16"/>
          <Checkbox label="Biometric information"/>
          <Checkbox label="Criminal proceedings, outcomes and sentences"/>

          <br/>

          <TextField hintText="Who is the asset shared with?" />

          <br/>

          <TextField
            hintText="Is the asset shared outside of the EEA? If so, to whom?"
            style={{ width: 400 }}
          />

          <br/><br/>

          <span>How long will this asset be retained for?</span>
          <RadioButtonGroup name="retention" onChange={(event, value) => this.setState({retention: value})}>
            <RadioButton value="<=1" label="Less than 1 year"/>
            <RadioButton value=">1,<=5" label="1 - 5 years"/>
            <RadioButton value=">5,<=10" label="6 - 10 years"/>
            <RadioButton value=">10,<=75" label="10 - 75 years"/>
            <RadioButton value="forever" label="Forever"/>
            <RadioButton value="other" label="Other"/>
          </RadioButtonGroup>
          <TextField hintText="Other retention period" disabled={this.state.retention !== 'other'} />

          <br/><br/>

          <span>What are the risks of holding this information asset?</span>
          <Checkbox label="The University would be exposed to financial loss by disclosing this information, and/or activities relating to it."/>
          <Checkbox label="Damage or loss of this information would impact core day-to-day operations."/>
          <Checkbox label="Staff or students would be exposed to personal danger if this information was disclosed."/>
          <Checkbox label="The University would be compliant with all the necessary laws and regulations related to holding this information."/>
          <Checkbox label="The University would receive significant negative publicity, high-profile criticism or be exposed to a lawsuit if this information became public."/>

          <br/>

          <TextField hintText="Where is the asset stored?" />

          <br/><br/>

          <span>What format is the asset stored in?</span>
          <RadioButtonGroup
            defaultSelected="yes"
            style={{ display: 'flex' }}
            onChange={(event, value) => this.setState({storage_format: value.split(',')})}
          >
            <RadioButton value="digital" label="Digital" style={{ paddingRight: "20px", width: 'auto' }} />
            <RadioButton value="paper" label="Paper" style={{ paddingRight: "20px", width: 'auto' }} />
            <RadioButton value="digital,paper" label="Both" style={{ width: 'auto' }} />
          </RadioButtonGroup>

          <span>What are the risks of holding this information asset?</span>
          <Checkbox name="digital_storage_security" value="locked_cabinet" label="Locked filing cabinet"
                    disabled={this.state.storage_format.indexOf("digital") === -1}
          />
          <Checkbox name="digital_storage_security" value="safe" label="Safe"
                    disabled={this.state.storage_format.indexOf("digital") === -1}
          />
          <Checkbox name="digital_storage_security" value="locked_room" label="Locked room"
                    disabled={this.state.storage_format.indexOf("digital") === -1}
          />
          <Checkbox name="digital_storage_security" value="locked_building" label="Locked building"
                    disabled={this.state.storage_format.indexOf("digital") === -1}
          />
          <Checkbox name="paper_storage_security" value="pwd_controls" label="Password controls"
                    disabled={this.state.storage_format.indexOf("paper") === -1}
          />
          <Checkbox name="paper_storage_security" value="acl" label="Access control lists"
                    disabled={this.state.storage_format.indexOf("paper") === -1}
          />
          <Checkbox name="paper_storage_security" value="backup" label="Backup"
                    disabled={this.state.storage_format.indexOf("paper") === -1}
          />
          <Checkbox name="paper_storage_security" value="encryption" label="Encryption"
                    disabled={this.state.storage_format.indexOf("paper") === -1}
          />
        </div>
      </div>
    )
  }
}

export default AssetForm
