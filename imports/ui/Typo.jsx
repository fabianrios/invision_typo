import React, { Component, PropTypes } from 'react';
 
// Typo component - represents a single font item
export default class Typo extends Component {
  render() {
    return (
      <li><h3 style={{fontFamily:this.props.typo.font}}>{this.props.typo.text}</h3></li>
    );
  }
}
 
Typo.propTypes = {
  // We can use propTypes to indicate it is required
  typo: PropTypes.object.isRequired,
};