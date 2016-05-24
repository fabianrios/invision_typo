import React, { Component } from 'react';
 
import Typo from './Typo.jsx';
 
// App component - represents the whole app
export default class App extends Component {

  // TO-DO: using default react methods
  // componentDidMount() {
  //   this.loadFontData()
  // }
  //
  // loadFontData() {
  //
  // }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchString: ""
    };
  }
  
  handleChange(e){
    this.setState({searchString:e.target.value});
  }
  
  getTypos() {
    
    var url = 'https://www.googleapis.com/webfonts/v1/webfonts?';
    var key = 'key=AIzaSyDrwscy04xGYMeRyeWOnxXilRnyCafwqHA';
    var req = url + key;
    var fonts = [];
    var respond = [];
    var that;

    $.ajax({
    url: req,
    async: false,
    dataType: 'json',
    cache: true,
    success: function(data) {
      that = this;
      for (var i = 0; i < data.items.length/2; i++) {
        var font = data.items[i];
        fonts.push(font.family);
        respond.push({_id: i, text: 'This is type'+font.family, font: font.family});
      }
       
    }.bind(this),
    error: function(xhr, status, err) {
      // TO-DO:better reporting
      console.error(status, err.toString());
    }.bind(this)
  });

  WebFont.load({
      google: {
        families: fonts
      },
      active: function() {
        // Font's have loaded.. Do something!
        //console.log("loaded");
      }
    });
    
    return respond;
  }
 
  renderTypos() {
    
    searchString = this.state.searchString.trim()
    console.log(searchString);
    
    return this.getTypos().map((typo) => (
      <Typo key={typo._id} typo={typo} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <input type="search" value={this.state.searchString} onChange={this.handleChange} />
        </header>
 
        <ul className="request_data">
          {this.renderTypos()}
        </ul>
      </div>
    );
  }
}