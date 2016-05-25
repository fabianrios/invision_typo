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
      color:"#000", 
      pcolor:'#333'
    };
  }

  
  colorChange(e){
    console.log(e.currentTarget.id);
    if (e.currentTarget.id == "text_display"){
      var color = {color:this.refs.colorpk.state.background};
    }else{
      var color = {pcolor:this.refs.colorpk.state.background};
    }
    this.props.onColorChange(this, color);
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
    
    var pStyle = {
      color: this.state.pcolor
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
            <input type="text" id="text_display" style={hStyle} onClick={this.colorChange} value="Lorem ipsum dolor sit amet" />
            <div className="textarea">
              <textarea id="par_display" style={pStyle} onClick={this.colorChange}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, maiores, id consequuntur totam perspiciatis explicabo exercitationem veritatis temporibus fugiat facere perferendis possimus velit ad earum aspernatur incidunt suscipit! Voluptatibus, tempora.</textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {onColorChange: PropTypes.func.isRequired};  
App.defaultProps = {onColorChange: function(that, color) {that.setState(color); }};