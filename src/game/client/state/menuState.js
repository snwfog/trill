var factory = require('modFactory.js');
var State = require('state/state.js');

var buttonSpacing = 20;

var MenuState = function (game) {

  State.call(this, game);

  this.emitter = null;
  this.title = null;
  this.newButton = null;
  this.joinButton = null;
  this.helpButton = null;
  this.popup = null;
};

MenuState.prototype = Object.create(State.prototype);

MenuState.prototype.constructor = MenuState;

MenuState.prototype.onCreate = function () {

  this.title = factory.text.title.big(this.game, 'Trill');
  this.newButton = factory.button.blue(this.game, "New Game");
  this.joinButton = factory.button.yellow(this.game, "Join Game");
  this.helpButton = factory.button.grey.small(this.game, "?");
  this.popup = factory.popup(this.game, "This is some help text.");

  this.addMods([
    this.title,
    this.newButton,
    this.joinButton,
    this.helpButton,
    this.popup
  ]);

  factory.tween.fadeIn(this).start();

  this.emitter = this.game.add.emitter(this.game.world.centerX, -32, 100);
  this.emitter.makeParticles("leaf");
  this.emitter.gravity = 0;
  this.emitter.width = this.game.world.width * 1.1;
  this.emitter.setYSpeed(30, 100);
  this.emitter.z = 0;
  this.emitter.start(false);
};

MenuState.prototype.onPostCreate = function () {
  this.helpButton.object.onInputUp.add(function () {
    this.popup.show();
  }, this);

  this.newButton.object.onInputUp.add(function () {
    factory.tween.fadeOut(this, 'create').start();
  }, this);

  this.joinButton.object.onInputUp.add(function () {
    factory.tween.fadeOut(this, 'join').start();
  }, this);
};

MenuState.prototype.onRender = function () {
//  this.game.debug.spriteBounds(this.title);
//  this.game.debug.cameraInfo(this.game.camera, this.game.world.centerX - 200, this.game.world.centerY);
//  this.game.debug.geom(this.game.world.bounds, '#FF0000', false);
};

MenuState.prototype.onResize = function (width, height) {

  this.emitter.position.setTo(this.game.world.centerX, -32);
  this.emitter.width = this.game.world.width * 1.1;

  this.title.group.position.setTo(width / 2, Math.max(0.25 * height, this.title.bounds.height / 2 + buttonSpacing));

  if (width > height) {
    this.newButton.group.position.setTo(width / 2 - this.newButton.bounds.width / 2 - buttonSpacing, 0.60 * height);
    this.joinButton.group.position.setTo(width / 2 + this.newButton.bounds.width / 2 + buttonSpacing, 0.60 * height);
  }
  else {
    this.newButton.group.position.setTo(width / 2, 0.65 * height - this.newButton.bounds.height / 2 - buttonSpacing);
    this.joinButton.group.position.setTo(width / 2, 0.65 * height + this.newButton.bounds.height / 2 + buttonSpacing);
  }
  this.helpButton.group.position.setTo(width / 2, (height + this.joinButton.bounds.bottom) / 2);

  this.popup.group.position.setTo(width / 2, height / 2);
};

module.exports = MenuState;