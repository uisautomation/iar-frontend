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

/*
  A component implementing an auto-complete that search's for a user either by name or CRSID and returns a list of
  possible matches for the user to select. The CRSID is set as the selected value. Also an initial CRSID is looked up
  and the full name is displayed as the selected value.
  */
class Lookup extends Component {

  constructor() {
    super();

    this.state = {
      suggestions: [],
      // the selected user's full name
      searchText: ""
    };

    this.searchPeopleDebounced = _.debounce(this.searchPeopleDebounced, 200);
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      searchText: newValue,
    });
    this.searchPeopleDebounced(newValue);
  };

  handleDelete = () => {
    this.props.onChange({target: {name: this.props.name, value: null}});
  };

  getSuggestionValue = (suggestion) => {
    this.props.onChange({target: {name: this.props.name, value: suggestion.identifier.value}});
    return this.displayName(suggestion);
  };

  /*
  Dispatches the search people action after being debounced if the searchText has 2 or more chars.
   */
  searchPeopleDebounced(searchText) {
    if (searchText.length >= 2) {
      let suggestions = this.props.matchingPeopleByQuery.get(searchText);
      if (suggestions) {
        this.setState({suggestions});
      } else {
        this.props.listPeople(searchText);
      }
    } else {
      this.setState({suggestions: []});
    }
  }

  /*
  Fetch the owner's name for the lookup API.
   */
  componentWillReceiveProps(nextProps) {
    let suggestions = nextProps.matchingPeopleByQuery.get(this.state.searchText);
    if (suggestions) {
      this.setState({suggestions});
    }
    if (nextProps.value && this.props.value !== nextProps.value) {
      this.props.getPeople(nextProps.value);
    }
  }

  renderInput = (inputProps) => {
    const { ref, helperText, label, person, onDelete, ...other } = inputProps;

    if (person) {
      return <Chip label={this.displayName(person)} onDelete={onDelete} />
    }

    return (
      <TextField
        fullWidth
        inputRef={ref}
        helperText={helperText}
        label={label}
        InputProps={other}
      />
    );
  }

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(this.displayName(suggestion), query);
    const parts = parse(this.displayName(suggestion), matches);

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
  }

  renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }


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
        renderSuggestionsContainer={this.renderSuggestionsContainer}
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

  displayName(person) {
    return person.visibleName + " (" + person.identifier.value + ")";
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

  let person = null;
  if (props.value) {
    person = peopleByCrsid.get(props.value);
  }

  return { person, matchingPeopleByQuery };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Lookup));
