var State = require('state/state.js');
var Text = require('mods/text.js');

var Button = function (game, parms) {

  State.call(this, game);

  this.parms = parms;

  this.button = null;
  this.text = null;

  var state = this;
  Object.defineProperties(this.bounds,
      {
        width: {
          get: function () {
            return state.button !== null ? state.button.width : 0;
          }
        },

        height: {
          get: function () {
            return state.button !== null ? state.button.height : 0;
          }
        }
      });
};

Button.prototype = Object.create(State.prototype);

Button.prototype.constructor = Button;

Button.prototype.onCreate = function () {
  this.button = this.add.button(0, 0, this.parms.sheet, undefined, undefined, this.parms.up, this.parms.up, this.parms.down, this.parms.up, this.group);
  this.button.anchor.setTo(0.5, 0.5);

  this.text = new Text(this.game, {value: this.parms.text, style: this.parms.textStyle, color: this.parms.color});
  this.addMod(this.text);
};

Button.prototype.onPostCreate = function () {
  this.button.onInputDown.add(function () {
    this.text.group.position.setTo(0, 3);
  }, this);

  this.button.onInputUp.add(function () {
    this.text.group.position.setTo(0, 0);
  }, this);
};

Button.prototype.onResize = function () {
  this.button.x = 0;
  this.button.y = 0;

  this.text.group.position.setTo(0, 0);
};

module.exports = Button;