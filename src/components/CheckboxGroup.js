import React, {Component} from 'react'
import { Checkbox } from 'material-ui';

const containerStyle = {
  borderTop: '1px solid #d1d1d1',
  borderLeft: '1px solid #d1d1d1'
};

const itemStyle = {
  borderBottom: '1px solid #d1d1d1',
  borderRight: '1px solid #d1d1d1'
};

const titleStyle = {
  padding: '30px 0 20px'
};

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
      return <div className='App-grid-item' style={itemStyle}>
          <Checkbox
          label={item.label}
          disabled={this.props.disabled}
          checked={this.props.values.indexOf(item.value) !== -1}
          onCheck={() => this.updateCheck(item.value)}
          key={item.value}
          />
        </div>
    });
    return (
      <div>
        {this.props.title ? <div style={ titleStyle }>{this.props.title}</div> : ""}
        <div style={ containerStyle } className={"App-grid-container App-grid-" + (this.props.columns ? this.props.columns : '1')}>
          {checkboxes}
        </div>
      </div>
    )
  };
}

export default CheckboxGroup
