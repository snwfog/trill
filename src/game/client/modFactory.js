var Button = require('mods/button.js');
var Title = require('mods/title.js');

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
    }
  },

  text: {
    title: function(game){
      return new Title(game);
    }
  }
};

module.exports = modFactory;
