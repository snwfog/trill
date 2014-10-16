var factory = require('modFactory.js');
var State = require('state/state.js');

var textMargin = 20;

var Create = function (game) {

  State.call(this, game);

  this.title = null;
  this.backButton = null;
  this.infoText = null;
};

Create.prototype = Object.create(State.prototype);

Create.prototype.constructor = Create;

Create.prototype.onCreate = function () {
  this.title = factory.text.title(this.game, 'New Game');
  this.backButton = factory.button.grey.big(this.game, 'Back');
  this.infoText = factory.text.normal(this.game, 'Ask your opponent to click on "Join game" and enter the following code :');

  this.addMods([
    this.title,
    this.backButton,
    this.infoText
  ]);

  factory.tween.fadeIn(this).start();
};

Create.prototype.onPostCreate = function () {

  this.infoText.object.wordWrap = true;
  this.infoText.object.align = 'center';

  this.backButton.object.onInputUp.add(function () {
    factory.tween.fadeOut(this, 'menu').start();
  }, this);
};

Create.prototype.onResize = function (width, height) {

  this.title.wordWrapWidth = width - textMargin * 2;
  this.title.group.position.setTo(width / 2, Math.max(0.25 * height, this.title.bounds.height / 2 + textMargin));

  this.backButton.group.position.setTo(width / 2, 0.85 * height);

  if (width > height) {
    this.infoText.object.wordWrapWidth = width / 2 - textMargin;
    this.infoText.group.position.setTo(width / 2 - this.infoText.bounds.width / 2 - textMargin / 2, 0.5 * height);
  }
  else {
    this.infoText.object.wordWrapWidth = width - textMargin * 2;
    this.infoText.group.position.setTo(width / 2, 0.5 * height);
  }

};

module.exports = Create;