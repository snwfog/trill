var factory = require('modFactory.js');
var State = require('state/state.js');

var buttonSpacing = 20;

var Create = function (game) {

  State.call(this, game);

  this.title = null;
  this.backButton = null;
};

Create.prototype = Object.create(State.prototype);

Create.prototype.constructor = Create;

Create.prototype.onCreate = function () {
  this.title = factory.text.title(this.game, 'New Game');
  this.backButton = factory.button.grey.big(this.game, 'Back');

  this.addMods([
    this.title,
    this.backButton
  ]);

  factory.tween.fadeIn(this).start();
};

Create.prototype.onPostCreate = function () {
  this.backButton.object.onInputUp.add(function () {
    factory.tween.fadeOut(this, 'menu').start();
  }, this);
};

Create.prototype.onResize = function (width, height) {
  this.title.group.position.setTo(width / 2, 0.25 * height);
  this.backButton.group.position.setTo(width / 2, 0.85 * height);
};

module.exports = Create;