var factory = require('modFactory.js');
var State = require('state/state.js');

var textMargin = 20;

var Join = function (game) {

  State.call(this, game);

  this.title = null;
  this.backButton = null;
  this.infoText = null;
  this.input = null;
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

  this.input = document.createElement("input");
  this.input.type = 'text';
  this.input.placeholder = 'Code';
  document.querySelector('form').appendChild(this.input);
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

  this.input.parentNode.onsubmit = function () {
    console.log('submitted');
    state.input.blur();
    return false;
  };
};

Join.prototype.onResize = function (width, height) {

  this.title.wordWrapWidth = width - textMargin * 2;
  this.title.group.position.setTo(width / 2, Math.max(0.25 * height, this.title.bounds.height / 2 + textMargin));

  this.backButton.group.position.setTo(width / 2, 0.85 * height);

  this.waitText.group.position.setTo(width / 2, height / 2);

  if (width > height) {
    this.infoText.object.wordWrapWidth = width / 2 - textMargin;
    this.infoText.group.position.setTo(width / 2 - this.infoText.bounds.width / 2 - textMargin / 2, 0.5 * height);

    this.input.style.left = (0.75 * width - this.input.offsetWidth / 2) + 'px';
    this.input.style.top = (0.5 * height - this.input.offsetHeight / 2) + 'px';
  }
  else {
    this.infoText.object.wordWrapWidth = width - textMargin * 2;
    this.infoText.group.position.setTo(width / 2, 0.5 * height);

    this.input.style.left = (0.5 * width - this.input.offsetWidth / 2) + 'px';
    this.input.style.top = (this.infoText.bounds.bottom + textMargin + this.input.offsetHeight) + 'px';
  }

};

Join.prototype.onShutdown = function () {
  this.input.parentNode.removeChild(this.input);
};

module.exports = Join;