var State = require('state/state.js');

var Button = function (game, parms) {

  State.call(this, game);

  this.parms = parms;

  this.button = null;
  this.text = null;

  Object.defineProperty(this, 'size', {
    get: function () {
      return this.button !== null ? { width: this.button.width, height: this.button.height} : {width: 0, height: 0};
    }
  });
};

Button.prototype = Object.create(State.prototype);

Button.prototype.constructor = Button;

Button.prototype.onCreate = function () {
  this.button = this.add.button(0, 0, this.parms.sheet, undefined, undefined, this.parms.up, this.parms.up, this.parms.down, this.parms.up, this.group);
  this.button.anchor.setTo(0.5, 0.5);

  this.text = this.game.add.text(0, 0, this.parms.text, {font: this.parms.textStyle || '15px Future', fill: this.parms.color || '#EEEEEE'}, this.group);
  this.text.anchor.setTo(0.5, 0.5);

  this.button.onInputDown.add(function(){
    this.text.position.setTo(0, 3);
  }, this);

  this.button.onInputUp.add(function(){
    this.text.position.setTo(0, 0);
  }, this);
};

Button.prototype.onResize = function () {
  this.button.x = 0;
  this.button.y = 0;

  this.text.position.setTo(0, 0);
};

module.exports = Button;