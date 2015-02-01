var State = require('state/state.js');

var Text = function (game, parms) {

  State.call(this, game);

  this.parms = parms;

  this.object = null;

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

Text.prototype = Object.create(State.prototype);

Text.prototype.constructor = Text;

Text.prototype.onCreate = function () {

  this.object = this.game.add.text(0, 0, this.parms.value, {
    font: this.parms.style || '15px Future',
    fill: this.parms.color || '#11111'
  }, this.group);
  this.object.anchor.setTo(0.5, 0.5);
};

Text.prototype.onResize = function () {
  this.object.position.setTo(0, 0);
};

module.exports = Text;