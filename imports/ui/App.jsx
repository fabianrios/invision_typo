import React, { Component } from 'react';
 
import Typo from './Typo.jsx';
 
// App component - represents the whole app
export default class App extends Component {
  getTypos() {
    return [
      { _id: 1, text: 'This is type Average', font: 'Average' },
      { _id: 2, text: 'This is type Cabin', font: 'Cabin' },
      { _id: 3, text: 'This is type Cardo', font: 'Cardo' },
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
 
        <ul className="request_data">
          {this.renderTypos()}
        </ul>
      </div>
    );
  }
}