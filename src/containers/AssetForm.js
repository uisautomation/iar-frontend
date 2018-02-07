import config from '../config';
import React, { Component } from 'react'

import Page from '../containers/Page';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { TextField } from 'material-ui';
import { AssetFormHeader, BooleanChoice, CheckboxGroup, Lookup } from '../components'
import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';

import { connect } from 'react-redux';
import { snackbarOpen } from '../redux/actions/snackbar';

const ACCESS_TOKEN =
  'PBi2W7PuYQ6RU4LLW-kVYfACXNAYPt6KXVNcQ0ivkUc.oN2ZYkfzYtE8-bF3dBE_3Nx_PPMvQMQtJeq_Vp_yBDg';

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

/*
  Renders the form for the creation/editing of an Asset.
  */
class AssetForm extends Component {

  constructor() {
    super();

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
    const nullToBlank = v => ( v === null ? '' : v );

    const onChange = ({ target: { name, value } }) => {
      this.setState({ [name]: value === '' ? null : value });
    }

    const onBooleanChange = ({ target: { name, value } }) => {
      onChange({ target: { name, value: value === "true" } })
    };

    const onCheckboxChange = ({ target: { name } }, checked) => (
      onChange({ target: { name, value: checked } })
    );

    return (
      <Page>
        <AssetFormHeader
          onClick={() => this.handleSave()}
          title={this.props.match.url === '/asset/create' ? 'Create new asset' : 'Editing: ' + this.state.name}
        />

        <Grid container>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Asset name"
              helperText={
                "Give the asset a unique name so you can easily identify it, for example, " +
                "'Visting academics database'."
              }
              name='name'
              value={nullToBlank(this.state.name)}
              onChange={onChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Asset purpose"
              helperText={
                "For example, 'To keep a record of current and former staff and salaries for HR " +
                "purposes'."
              }
              name='purpose'
              value={nullToBlank(this.state.purpose)}
              onChange={onChange}
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Asset department"
              name='department'
              value={nullToBlank(this.state.department)}
              onChange={onChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            {/* The "===" true is necessary since private could also be null */}
            <FormControlLabel
              control={<Switch />}
              checked={this.state.private === true}
              label="Make this record private to your deparment"
              margin="normal"
              name="private"
              onChange={onCheckboxChange}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            Is this asset retained for research purposes?
          </Grid>
          <Grid item xs={6}>
            <BooleanChoice name="research" value={this.state.research} onChange={onBooleanChange} />
          </Grid>
          <Grid item xs={6}>
            Who is the Principle Investigator of this research activity?
          </Grid>
          <Grid item xs={6}>
            <Lookup
              disabled={!this.state.research}
              label="Principle Investigator"
              helperText="You can search by name or CRSid"
              name="owner"
              value={this.state.owner}
              onChange={onChange}
              fetch={this.fetch}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            Does this asset hold any Personal Data?
          </Grid>
          <Grid item xs={6}>
            <BooleanChoice name="personal_data" value={this.state.personal_data}
              onChange={onBooleanChange} />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <CheckboxGroup
              title='Who does this personal data belong to?'
              name='data_subject'
              labels={DATA_SUBJECT_LABELS}
              values={this.state.data_subject}
              onChange={onChange}
              disabled={!this.state.personal_data}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <CheckboxGroup
              title='What kind of personal data is held?'
              name='data_category'
              labels={DATA_CATEGORY_LABELS}
              values={this.state.data_category}
              onChange={onChange}
              columns="2"
              disabled={!this.state.personal_data}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              label="Which organisations is the asset shared with external to the University?"
              helperText="This could be a company or individual."
              name='recipients_category'
              value={this.state.recipients_category === null ? "" : this.state.recipients_category}
              onChange={onChange}
              disabled={!this.state.personal_data}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              label="Is the asset shared outside of the EEA (European Economic Area)?"
              helperText={
                "This could be a company or an individual. More information regards the " +
                "EEA can be found here."
              }
              name='recipients_outside_eea'
              value={this.state.recipients_outside_eea === null ? "" : this.state.recipients_outside_eea}
              onChange={onChange}
              disabled={!this.state.personal_data}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <div style={{padding: '20px 0'}}>How long will this asset be retained for?</div>
            <RadioGroup
              name="retention"
              value={this.state.retention}
              onChange={onChange}
            >
              <FormControlLabel control={<Radio />} disabled={!this.state.personal_data} style={retentionStyle}
                           value="<=1" label="Less than 1 year" />
              <FormControlLabel control={<Radio />} disabled={!this.state.personal_data} style={retentionStyle}
                           value=">1,<=5" label="1 - 5 years" />
              <FormControlLabel control={<Radio />} disabled={!this.state.personal_data} style={retentionStyle}
                           value=">5,<=10" label="6 - 10 years" />
              <FormControlLabel control={<Radio />} disabled={!this.state.personal_data} style={retentionStyle}
                           value=">10,<=75" label="10 - 75 years" />
              <FormControlLabel control={<Radio />} disabled={!this.state.personal_data} style={retentionStyle}
                           value="forever" label="Forever" />
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <CheckboxGroup
              title='What are the risks if the information in this asset was lost or compromised?'
              name="risk_type"
              labels={RISK_TYPE_LABELS}
              values={this.state.risk_type}
              onChange={onChange}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              label="Where is the asset stored?"
              helperText={
                "For example, on a virtual machine, in a shared drive, in cloud storage. " +
                "Ask your compuuter officer if you're not sure."
              }
              name="storage_location"
              value={this.state.storage_location === null ? "" : this.state.storage_location}
              onChange={onChange}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            What format is the asset stored in?
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              row
              name="storage_format"
              value={this.state.storage_format.sort().toString()}
              onChange={(event, value) => this.setState({storage_format: value.split(',')})}
            >
              <FormControlLabel control={<Radio />} value="digital" label="Digital" />
              <FormControlLabel control={<Radio />} value="paper" label="Paper" />
              <FormControlLabel control={<Radio />} value="digital,paper" label="Both" />
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <CheckboxGroup
              title='How is the asset kept secure?'
              labels={DIGITAL_STORAGE_SECURITY_LABELS}
              name="digital_storage_security"
              values={this.state.digital_storage_security}
              onChange={onChange}
              disabled={this.state.storage_format.indexOf("digital") === -1}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckboxGroup
              labels={PAPER_STORAGE_SECURITY_LABELS}
              name="paper_storage_security"
              values={this.state.paper_storage_security}
              onChange={onChange}
              disabled={this.state.storage_format.indexOf("paper") === -1}
            />
          </Grid>
        </Grid>
      </Page>
    )
  }
}

const mapDispatchToProps = { handleMessage: snackbarOpen };

export default connect(null, mapDispatchToProps)(AssetForm);
