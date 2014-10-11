var Button = require('mods/button.js');
var Title = require('mods/title.js');
var Popup = require('mods/popup.js');

var modFactory = {

  button: {
    blue: function (game, text) {
      return new Button(game, {
        sheet:"blueSheet",
        up: "blue_button00",
        down: "blue_button01",
        text: text
      })
    },

    yellow: function(game, text){
      return new Button(game, {
        sheet:"yellowSheet",
        up: "yellow_button00",
        down: "yellow_button01",
        text: text
      })
    },

    grey: function(game, text){
      return new Button(game, {
        sheet:"greySheet",
        up: "grey_button08",
        down: "grey_button09",
        text: text,
        color : '#000000',
        textStyle : '25px Future'
      })
    }
  },

  text: {
    title: function(game){
      return new Title(game);
    }
  },

  popup: function(game, text){
    return new Popup(game, {
      text: text
    });
  }
};

module.exports = modFactory;
