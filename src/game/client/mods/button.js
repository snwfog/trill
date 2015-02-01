var State = require('state/state.js');
var Text = require('mods/text.js');

var Button = function (game, parms) {

  State.call(this, game);

  this.parms = parms;

  this.object = null;
  this.text = null;

  var state = this;
  Object.defineProperties(this.bounds,
      {
        width: {
          get: function () {
            return state.object !== null ? state.object.width : 0;
          }
        },

        height: {
          get: function () {
            return state.object !== null ? state.object.height : 0;
          }
        }
      });
};

Button.prototype = Object.create(State.prototype);

Button.prototype.constructor = Button;

Button.prototype.onCreate = function () {
  this.object = this.add.button(0, 0, this.parms.sheet, undefined, undefined, this.parms.up, this.parms.up, this.parms.down, this.parms.up, this.group);
  this.object.anchor.setTo(0.5, 0.5);

  this.text = new Text(this.game, {value: this.parms.text, style: this.parms.textStyle, color: this.parms.color});
  this.addMod(this.text);
};

Button.prototype.onPostCreate = function () {
  this.object.onInputDown.add(function () {
    this.text.group.position.setTo(0, 3);
  }, this);

  this.object.onInputUp.add(function () {
    this.text.group.position.setTo(0, 0);
  }, this);
};

Button.prototype.onResize = function () {
  this.object.x = 0;
  this.object.y = 0;

  this.text.group.position.setTo(0, 0);
};

Button.prototype.onShutdown = function () {
  this.object.onInputUp.removeAll();
  this.object.onInputDown.removeAll();
};

module.exports = Button;