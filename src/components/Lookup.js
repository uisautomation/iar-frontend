import React, {Component} from 'react'
import {AutoComplete} from 'material-ui';
import _ from "lodash";
import {getPerson, searchPeople} from '../redux/actions';
import {connect} from "react-redux";
import PropTypes from "prop-types";

/*
  A component implementing an auto-complete that search's for a user either by name or CRSID and returns a list of
  possible matches for the user to select. The CRSID is set as the selected value. Also an initial CRSID is looked up
  and the full name is displayed as the selected value.
  */
class Lookup extends Component {

  constructor() {
    super();

    this.state = {
      // the selected user's full name
      displayName: ""
    };

    this.searchPeopleDebounced = _.debounce(this.searchPeopleDebounced, 200);
  }

  /*
  FIXME
   */
  searchPeopleDebounced(searchText) {
    if (searchText.length >= 2) {
      this.props.searchPeople(searchText);
    }
  }

  /*
  Fetch the owner's name for the lookup API.
   */
  componentWillReceiveProps(nextProps) {
      if (nextProps.value && this.props.value !== nextProps.value) {
        this.props.getPerson(nextProps.value);
      }
      if (!this.state.displayName && nextProps.person) {
        this.setState({displayName: nextProps.person.visibleName})
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
    this.searchPeopleDebounced(searchText)
  }

  render() {
    return (
      <AutoComplete
        disabled={this.props.disabled}
        hintText={this.props.hintText}
        searchText={this.state.displayName}
        filter={AutoComplete.noFilter}
        dataSource={/* FIXME */ this.props.matchingPeopleByQuery.get(this.state.displayName) ? this.props.matchingPeopleByQuery.get(this.state.displayName) : []}
        dataSourceConfig={{text: 'visibleName', value: 'identifier.value'}}
        onUpdateInput={(searchText) => this.handleOwnerUpdateInput(searchText)}
        onNewRequest={(chosenRequest) => this.props.onChange({target: {name: this.props.name}}, chosenRequest.identifier.value)}
      />
    )
  }
}

Lookup.propTypes = {
  getPerson: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  hintText: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  matchingPeopleByQuery: PropTypes.object.isRequired,
  person: PropTypes.object,
};

const mapDispatchToProps = { getPerson, searchPeople };

const mapStateToProps = ({ lookupApi: {peopleByCrsid, matchingPeopleByQuery} } , props) => {

  let person = null;
  if (props.value) {
    person = peopleByCrsid.get(props.value);
  }

  return { person, matchingPeopleByQuery };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lookup);
