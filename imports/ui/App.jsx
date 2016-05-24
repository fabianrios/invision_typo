import React, { Component } from 'react';
 
import Typo from './Typo.jsx';
 
// App component - represents the whole app
export default class App extends Component {
  getTypos() {
    return [
      { _id: 1, text: 'This is type 1' },
      { _id: 2, text: 'This is type 2' },
      { _id: 3, text: 'This is type 3' },
    ];
  }
 
  renderTypos() {
    return this.getTypos().map((typo) => (
      <Typo key={typo._id} typo={typo} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <input type="search" />
        </header>
 
        <ul>
          {this.renderTypos()}
        </ul>
      </div>
    );
  }
}