import React, {Component} from 'react'
import {AutoComplete} from 'material-ui';
import _ from "underscore";
import config from '../config';

const ENDPOINT_SEARCH = config.ENDPOINT_LOOKUP + 'search';

const ENDPOINT_PEOPLE = config.ENDPOINT_LOOKUP + 'people/crsid/';

/*
  A component implementing an auto-complete that search's for a user either by name or CRSID and returns a list of
  possible matches for the user to select. The CRSID is set as the selected value. Also an initial CRSID is looked up
  and the full name is displayed as the selected value.
  */
class Lookup extends Component {

  constructor() {
    super();

    this.fetchMatchingUsers = _.debounce(this.fetchMatchingUsers, 200);

    this.state = {
      // the list of matching users returned from lookup
      matchingUsers: [],
      // the selected user's full name
      displayName: ""
    }
  }

  /*
  Fetch the owner's name for the lookup API.
   */
  componentWillReceiveProps(nextProps) {
      if (nextProps.value && this.props.value !== nextProps.value) {
        this.props.fetch(ENDPOINT_PEOPLE + nextProps.value, {}, data => {
          this.setState({displayName: data.visibleName})
        });
      }
  }

  /*
  As the user types into the owner AutoComplete the displayName is updated and a list of users
  matching the searchText is fetched.
  Deleting all text is detected and the owner field is cleared to allow the deleting of an owner.
   */
  handleOwnerUpdateInput(searchText) {
    if (!searchText) {
      this.props.onChange({target: {name: this.props.name}}, null);
    }
    this.setState({displayName: searchText});
    this.fetchMatchingUsers(searchText);
  }

  /*
  Fetches a list of users matching the searchText from the lookup api.
  This function is debounced to reduce the number of remote calls.
   */
  fetchMatchingUsers(searchText) {
    // TODO (include CRSID in display name)
    let self = this;
    this.props.fetch(
      ENDPOINT_SEARCH + "?limit=10&query=" + encodeURIComponent(searchText), {},
      data => self.setState({matchingUsers: data.results})
    );
  }

  render() {
    return (
      <AutoComplete
        disabled={this.props.disabled}
        hintText={this.props.hintText}
        searchText={this.state.displayName}
        filter={AutoComplete.noFilter}
        dataSource={this.state.matchingUsers}
        dataSourceConfig={{text: 'visibleName', value: 'identifier.value'}}
        onUpdateInput={(searchText) => this.handleOwnerUpdateInput(searchText)}
        onNewRequest={(chosenRequest) => this.props.onChange({target: {name: this.props.name}}, chosenRequest.identifier.value)}
      />
    )
  };
}

export default Lookup
