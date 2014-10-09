var State = require('state.js');

var Button = function(game, group){

  State.call(this, game, group);

  this.button = null;
};

Button.prototype = Object.create(State.prototype);

Button.prototype.constructor = Button;

Button.prototype.onCreate = function(){
  this.button = this.add.button(0, 0, 'blueSheet', undefined, undefined, 'blue_button00.png', 'blue_button00.png', 'blue_button01.png', 'blue_button00.png', this.group);
  this.button.anchor.setTo(0.5, 0.5);
};

Button.prototype.onResize = function(){
  this.button.setPosition(0,0);
};

module.exports = Button;