import React, {Component} from 'react'
import { Checkbox } from 'material-ui';

/*
  FIXME
  */
class CheckboxGroup extends Component {

  updateCheck(value) {
    let index = this.props.values.indexOf(value);
    if (index === -1) {
      this.props.values.push(value);
    } else {
      this.props.values.splice(index, 1);
    }
    this.props.onChange(this.props.values);
  }

  render() {
    var checkboxes = this.props.labels.map((item) => {
      return <Checkbox
        label={item.label}
        disabled={this.props.disabled}
        checked={this.props.values.indexOf(item.value) !== -1}
        onCheck={() => this.updateCheck(item.value)}
        key={item.value}
      />
    })
    return <div>{checkboxes}</div>
  };
};

export default CheckboxGroup
