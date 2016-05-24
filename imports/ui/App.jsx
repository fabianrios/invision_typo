import React, { Component } from 'react';
 
import Typo from './Typo.jsx';
import Color from './Color.jsx';
 
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
  
  getTypos(search) {
    
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
        //filter
        if (font.family.indexOf(search) > -1){
          fonts.push(font.family);
          respond.push({_id: i, text: 'This is type '+font.family, font: font.family});
        }
      }
    }.bind(this),
    error: function(xhr, status, err) {
      // TO-DO:better reporting
      console.error(status, err.toString());
    }.bind(this)
  });
  
  if(fonts.length > 0){
    WebFont.load({
      google: {
        families: fonts
      },
      active: function() {
        // Font's have loaded.. Do something!
      }
    });  
  }
  
  console.log(respond);
  return respond;
}
 
  renderTypos() {
    
    searchString = this.state.searchString.trim()
    
    return this.getTypos(searchString).map((typo) => (
      <Typo key={typo._id} typo={typo} />
    ));
  }
  
  renderColor(){
    return <Color />
  }
 
  render() {
    return (
      <div className="container">
      <div className="color">{this.renderColor()}</div>
        <header>
          <input type="search" value={this.state.searchString} onChange={this.handleChange} />
        </header>
        
        <ul className="request_data">
          {this.renderTypos()}
        </ul>
        <div className="other">
          <div id="content">
            <h1 id="text_display">Lorem ipsum dolor sit hmeg</h1>
          </div>
        </div>
      </div>
    );
  }
}