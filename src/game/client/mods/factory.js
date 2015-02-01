var Button = require('mods/button.js');
var Title = require('mods/title.js');
var Popup = require('mods/popup.js');
var FadeOut = require('mods/fadeOut.js');
var FadeIn = require('mods/fadeIn.js');
var Text = require('mods/text.js');
var Leaves = require('mods/leaves.js');

var modFactory = {

  button: {
    blue: function (game, text) {
      return new Button(game, {
        sheet: "blueSheet",
        up: "blue_button00",
        down: "blue_button01",
        text: text
      });
    },

    yellow: function (game, text) {
      return new Button(game, {
        sheet: "yellowSheet",
        up: "yellow_button00",
        down: "yellow_button01",
        text: text
      });
    },

    grey: {
      big: function (game, text) {
        return new Button(game, {
          sheet: "greySheet",
          up: "grey_button15",
          down: "grey_button00",
          text: text,
          color: '#000000'
        });
      },

      small: function (game, text) {
        return new Button(game, {
          sheet: "greySheet",
          up: "grey_button08",
          down: "grey_button09",
          text: text,
          color: '#000000',
          textStyle: '25px Future'
        });
      }
    }
  },

  text: {
    title: {
      big: function (game, text) {
        return new Title(game, {text: text});
      },

      small: function (game, text) {
        return new Title(game, {text: text, font: '30px Saucer'});
      }
    },

    normal: function (game, text) {
      return new Text(game, {
        value: text,
        color: '#11111',
        style: '15px Future'
      });
    }
  },

  popup: function (game, text) {
    return new Popup(game, {
      text: text
    });
  },

  tween: {
    fadeIn: FadeIn,
    fadeOut: FadeOut
  },

  leaves: function (game) {
    return new Leaves(game);
  }
};

module.exports = modFactory;
