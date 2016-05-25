import React, { Component, PropTypes } from 'react';

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
    this.colorChange = this.colorChange.bind(this);
    this.state = {
      searchString: "",
      color:"#000"
    };
  }

  
  colorChange(e){
    this.props.onColorChange(this, this.refs.colorpk.state.background);
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
  return respond;
}
 
  renderTypos() {
    
    searchString = this.state.searchString.trim()
    
    return this.getTypos(searchString).map((typo) => (
      <Typo key={typo._id} typo={typo} />
    ));
  }
  
  renderColor(){
    return <Color ref="colorpk" />
  }
  
  render() {
    var hStyle = {
      color: this.state.color
    };
    
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
            <h1 id="text_display" style={hStyle} onClick={this.colorChange}>Lorem ipsum dolor sit amet</h1>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {onColorChange: PropTypes.func.isRequired};  
App.defaultProps = {onColorChange: function(that, color) {that.setState({color:color}); }};