import React, { Component, PropTypes } from 'react';
import { SketchPicker } from 'react-color';


// Color component - represents a single font item
export default class Color extends Component {
  constructor(props) {
    super(props);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.state = {
      background: '#272121',
    };
  }
  
  handleChangeComplete(color) {
    var set_color = 'rgba('+color.rgb.r+','+color.rgb.g+','+color.rgb.b+','+color.rgb.a+')';
    console.log(set_color);
    this.setState({ background: set_color });
  }
  
  
  render() {
    return (
      <SketchPicker color={ this.state.background } onChangeComplete={ this.handleChangeComplete } />
    );
  }
}
