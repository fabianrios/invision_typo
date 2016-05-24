import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '../imports/ui/App.jsx';

WebFont.load({
    google: {
      families: ['Alegreya', 'Asap', 'Average', 'Cabin', 'Cardo', 'Crete Round', 'Crimson Text', 'Domine', 'Droid Sans', 'Droid Serif', 'Exo', 'Gentium Book Basic', 'Josefin Slab', 'Kreon', 'Lora', 'Libre Baskerville', 'Merriweather', 'Neuton', 'Noticia Text', 'Old Standard TT', 'Open Sans', 'Poly', 'PT Sans', 'PT Serif', 'Roboto', 'Source Sans Pro', 'Ubuntu', 'Varela', 'Vollkorn', 'Work Sans']
    },
    active: function() {
      // Font's have loaded.. Do something!
      console.log("sure done");
    }
  });
 
Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});