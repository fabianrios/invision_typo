import React, { Component, PropTypes } from 'react';
import { SketchPicker } from 'react-color';


// Color component - represents a single font item
export default class Color extends Component {
  constructor(props) {
    super(props);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.state = {
      background: '#f9f9f9',
    };
  }
  
  handleChangeComplete(color) {
    this.setState({ background: color.hex });
  }
  
  
  render() {
    return (
      <SketchPicker color={ this.state.background } onChangeComplete={ this.handleChangeComplete } />
    );
  }
}
 