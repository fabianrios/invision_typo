import React, { Component, PropTypes } from 'react';
 
// Task component - represents a single todo item
export default class Typo extends Component {
  render() {
    return (
      <li>{this.props.typo.text}</li>
    );
  }
}
 
Typo.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};