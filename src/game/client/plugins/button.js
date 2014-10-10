var State = require('state.js');

var Button = function (game, group) {

  State.call(this, game, group);

  this.button = null;

  Object.defineProperty(this, 'size', {
    get: function () {
      return this.button !== null ? { width: this.button.width, height: this.button.height} : {width: 0, height: 0};
    }
  });
};

Button.prototype = Object.create(State.prototype);

Button.prototype.constructor = Button;

Button.prototype.onCreate = function () {
  this.button = this.add.button(0, 0, 'blueSheet', undefined, undefined, 'blue_button00', 'blue_button00', 'blue_button01', 'blue_button00', this.group);
  this.button.anchor.setTo(0.5, 0.5);
};

Button.prototype.onResize = function () {
  this.button.x = 0;
  this.button.y = 0;
};

module.exports = Button;