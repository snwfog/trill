var factory = require('modFactory.js');
var State = require('state/state.js');

var buttonSpacing = 20;

var Create = function (game) {

  State.call(this, game);

  this.title = null;
};

Create.prototype = Object.create(State.prototype);

Create.prototype.constructor = Create;

Create.prototype.onCreate = function () {
  this.title = factory.text.title(this.game, 'New Game');

  this.addMods([
    this.title
  ]);

  factory.tween.fadeIn(this).start();
};

Create.prototype.onResize = function (width, height) {
  this.title.group.position.setTo(width / 2, 0.25 * height);
};

module.exports = Create;