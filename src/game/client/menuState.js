var Letter = require('./plugins/titleLetter.js');
var State = require('./state.js');

var MenuState = function (game){

  State.call(this, game);

  this.title = null;
};

MenuState.prototype = Object.create(State.prototype);

MenuState.prototype.constructor = MenuState;

MenuState.prototype.onCreate = function(){
  this.title = this.add.group();
  this.addMod(new Letter(this.game), this.title);
  this.onResize(this.game.width, this.game.height);
};

MenuState.prototype.onRender = function(){
//  this.game.debug.spriteBounds(this.title);
//  this.game.debug.cameraInfo(this.game.camera, this.game.world.centerX - 200, this.game.world.centerY);
//  this.game.debug.geom(this.game.world.bounds, '#FF0000', false);
};

MenuState.prototype.onResize = function(width, height){
  this.game.world.setBounds(0, 0, width, height);
  this.title.position.setTo(this.game.world.centerX, 0.25 * height);
};

module.exports = MenuState;