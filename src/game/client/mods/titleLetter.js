var State = require('state/state.js');

var Letter = function (game, group) {

  State.call(this, game, group);

  // the max amount by which the letter will move
  this.moveAmount = new Phaser.Point(5, 2);

  // the speed at which the letter will "shake" (in ms)
  this.frequency = 100;

  this.lastMoveTimeStamp = 0;

  this.titleTxt = null;
  this.titleBackground = null;
};

Letter.prototype = Object.create(State.prototype);

Letter.prototype.constructor = Letter;

Letter.prototype.onCreate = function () {

  this.titleBackground = this.game.add.text(0, 0, "Trill", {font: '65px Saucer', fill: '#FFFFFF'}, this.group);
  this.titleBackground.alpha = 0.5;
  this.titleBackground.anchor.setTo(0.5, 1);

  this.titleTxt = this.game.add.text(0, 0, "Trill", {font: '65px Saucer', fill: '#FFFFFF'}, this.group);
  this.titleTxt.anchor.setTo(0.5, 1);

  this.onResize(this.game.width, this.game.height);
};

Letter.prototype.onUpdate = function () {
  if (this.game.time.now - this.lastMoveTimeStamp > this.frequency) {
    this.titleTxt.position.setTo(
      this.moveAmount.x * (Math.random() - 0.5),
      this.moveAmount.y * (Math.random() - 0.5)
    );
    this.lastMoveTimeStamp = this.game.time.now;
  }
};

Letter.prototype.onResize = function (width, height) {
  this.titleBackground.position.setTo(0,0);
  this.titleTxt.position.setTo(0, 0);
};

module.exports = Letter;