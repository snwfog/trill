var Letter = require('plugins/titleLetter.js');
var BlueButton = require('plugins/button.js');
var State = require('state.js');

var buttonSpacing = 20;

var MenuState = function (game){

  State.call(this, game);

  this.title = null;
  this.blueButton = null;
};

MenuState.prototype = Object.create(State.prototype);

MenuState.prototype.constructor = MenuState;

MenuState.prototype.onCreate = function(){
  this.title = new Letter(this.game);
  this.blueButton = new BlueButton(this.game);

  this.addMods([
    this.title,
    this.blueButton
  ]);
};

MenuState.prototype.onRender = function(){
//  this.game.debug.spriteBounds(this.title);
//  this.game.debug.cameraInfo(this.game.camera, this.game.world.centerX - 200, this.game.world.centerY);
//  this.game.debug.geom(this.game.world.bounds, '#FF0000', false);
};

MenuState.prototype.onResize = function(width, height){
  this.game.world.setBounds(0, 0, width, height);
  this.title.group.position.setTo(this.game.world.centerX, 0.25 * height);

  if(width > height){
    this.blueButton.group.position.setTo(width/2 - this.blueButton.size.width/2 - buttonSpacing, 0.75 * height);
  }
  else {
    this.blueButton.group.position.setTo(width/2, 0.75 * height);
  }
};

module.exports = MenuState;