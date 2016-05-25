import React, { Component, PropTypes } from 'react';


// Typo component - represents a single font item
export default class Typo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      liked: false
    };
  }
  handleClick() {
    this.setState({
      liked: !this.state.liked,
    });
    console.log(this);
  }
  render() {
    var text = this.state.liked ? 'big' : '☆';
    return (
      <li onClick={this.handleClick} className={text}><h3 style={{fontFamily:this.props.typo.font}}> {this.props.typo.text}</h3></li>
    );
  }
}
 
Typo.propTypes = {
  // We can use propTypes to indicate it is required
  typo: PropTypes.object.isRequired,
};

// Typo.defaultProps = {
//     liked: false
// };