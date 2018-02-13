/**
 * A component implementing an auto-complete that search's for a user either by name or CRSID and returns a list of
 * possible matches for the user to select. The CRSID is set as the selected value. Also an initial CRSID is looked up
 * and the full name is displayed as the selected value.
 */
import React, {Component} from 'react'
import {Chip, MenuItem, Paper, TextField} from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import _ from "lodash";
import {getPeople, listPeople} from '../redux/actions/lookupApi';
import {connect} from "react-redux";
import PropTypes from "prop-types";

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    width: 300,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

/**
 * Called by Autosuggest to render the sugestion container.
 */
const renderSuggestionsContainer = (options) => {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
};

/**
 * @param person a person model retrieved from lookup
 * @returns {string} the display name for the person
 */
const formatDisplayName = (person) => {
  return person.visibleName + " (" + person.identifier.value + ")";
};

class Lookup extends Component {

  constructor() {
    super();

    this.state = {
      // the typed search text
      searchText: "",
      // the suggestions matching the search text
      suggestions: [],
    };

    this.listPeopleDebounced = _.debounce(this.listPeopleDebounced, 200);
  }

  /**
   * Dispatches the list people action after being debounced.
   *
   * @param searchText the search text for the action
   */
  listPeopleDebounced(searchText) {
    this.props.listPeople(searchText);
  }

  /**
   * Handles the input of search text. Suggestions are shown after two characters are typed.
   * The local cache is checked for suggestions before the lookup api is called.
   */
  handleChange = ({ }, { newValue }) => {
    this.setState({searchText: newValue});
    if (newValue.length >= 2) {
      let suggestions = this.props.matchingPeopleByQuery.get(newValue);
      if (suggestions) {
        this.setState({suggestions});
      } else {
        this.listPeopleDebounced(newValue);
      }
    } else {
      this.setState({suggestions: []});
    }
  };

  /**
   * Handles the deletion of the person chip. Clears the input value.
   */
  handleDelete = () => {
    this.props.onChange({target: {name: this.props.name, value: null}});
  };

  /**
   * Called by Autosuggest when a suggestion is selected. Updates the input vale with the CRSID.
   * It's irrelevant what it actually returns as TextField is replaced by Chip.
   */
  getSuggestionValue = (suggestion) => {
    this.props.onChange({target: {name: this.props.name, value: suggestion.identifier.value}});
    return "";
  };

  /**
   * Process property changes as follows ..
   */
  componentWillReceiveProps(nextProps) {

    // .. attempts to populate suggestions from the redux mapped matchingPeopleByQuery.
    let suggestions = nextProps.matchingPeopleByQuery.get(this.state.searchText);
    if (suggestions) {
      this.setState({suggestions});
    }

    // .. if the input value (CRSID) has been set - resolve the name from the lookup API
    if (nextProps.value && this.props.value !== nextProps.value) {
      this.props.getPeople(nextProps.value);
    }
  }

  /**
   * Called by Autosuggest to render the input. If the person property
   * (resolved from the input value) is set then a Chip representing the selected user is
   * displayed. Other a TextField is rendered allowing the user to search for a person.
   */
  renderInput = (inputProps) => {
    const { ref, helperText, label, person, onChange, onDelete, ...other } = inputProps;

    if (person) {
      return <Chip label={formatDisplayName(person)} onDelete={onDelete} />
    }

    return (
      <TextField
        fullWidth
        inputRef={ref}
        helperText={helperText}
        label={label}
        onChange={onChange}
        InputProps={other}
      />
    );
  };

  /**
   * Called by Autosuggest to render individual suggestions. Text highlighting is handled here.
   */
  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(formatDisplayName(suggestion), query);
    const parts = parse(formatDisplayName(suggestion), matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <strong key={String(index)} style={{ fontWeight: 500 }}>{part.text}</strong>
            ) : (
              <span key={String(index)} style={{ fontWeight: 300 }}>{part.text}</span>
            );
          })}
        </div>
      </MenuItem>
    );
  };

  render() {

    const { classes } = this.props;

    return (
      <Autosuggest
        onSuggestionsFetchRequested={() => {}}
        onSuggestionsClearRequested={() => {}}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={this.renderInput}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSuggestion={this.renderSuggestion}
        suggestions={this.state.suggestions}
        getSuggestionValue={this.getSuggestionValue}
        inputProps={{
          label: this.props.label,
          helperText: this.props.helperText,
          value: this.state.searchText,
          onChange: this.handleChange,
          onDelete: this.handleDelete,
          disabled: this.props.disabled,
          person: this.props.person
        }}
      />
     )
  }
}

Lookup.propTypes = {
  getPeople: PropTypes.func.isRequired,
  listPeople: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  helperText: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  matchingPeopleByQuery: PropTypes.object.isRequired,
  person: PropTypes.object,
};

const mapDispatchToProps = { getPeople, listPeople };

const mapStateToProps = ({ lookupApi: {peopleByCrsid, matchingPeopleByQuery} } , props) => {

  // attempt to resolve the selected person from the mapped peopleByCrsid.
  let person = null;
  if (props.value) {
    person = peopleByCrsid.get(props.value);
  }

  return { person, matchingPeopleByQuery };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Lookup));
