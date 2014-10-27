var factory = require('modFactory.js');
var State = require('state/state.js');

var textMargin = 20;

var Join = function (game) {

  State.call(this, game);

  this.title = null;
  this.backButton = null;
  this.infoText = null;
};

Join.prototype = Object.create(State.prototype);

Join.prototype.constructor = Join;

Join.prototype.onCreate = function () {
  this.title = factory.text.title.big(this.game, 'Join Game');
  this.backButton = factory.button.grey.big(this.game, 'Back');
  this.infoText = factory.text.normal(this.game, 'Ask your opponent to create a new game on his device then enter the code displayed on his screen :');
  this.waitText = factory.text.title.small(this.game, 'Wait...');

  this.addMods([
    this.title,
    this.backButton,
    this.infoText,
    this.waitText
  ]);
};

Join.prototype.onPostCreate = function () {

  factory.tween.fadeIn(this).start();

  this.infoText.object.wordWrap = true;
  this.infoText.object.align = 'center';

  this.waitText.group.alpha = 0;

  this.backButton.object.onInputUp.add(function () {
    this.game.webapi.disconnect();
    factory.tween.fadeOut(this, 'menu').start();
  }, this);

  var state = this;
  this.game.webapi
      .on('connected', function () {

      })

      .on('gameReady', function () {
        // go to in game state
      })

      .connect();
};

Join.prototype.onResize = function (width, height) {

  this.title.wordWrapWidth = width - textMargin * 2;
  this.title.group.position.setTo(width / 2, Math.max(0.25 * height, this.title.bounds.height / 2 + textMargin));

  this.backButton.group.position.setTo(width / 2, 0.85 * height);

  this.waitText.group.position.setTo(width / 2, height / 2);

  if (width > height) {
    this.infoText.object.wordWrapWidth = width / 2 - textMargin;
    this.infoText.group.position.setTo(width / 2 - this.infoText.bounds.width / 2 - textMargin / 2, 0.5 * height);
  }
  else {
    this.infoText.object.wordWrapWidth = width - textMargin * 2;
    this.infoText.group.position.setTo(width / 2, 0.5 * height);
  }

};

module.exports = Join;