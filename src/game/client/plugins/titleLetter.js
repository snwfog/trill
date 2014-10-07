var State = require('../state.js');

var Letter = function (game, group) {

  State.call(this, game, group);

  // the max amount by which the letter will move
  this.moveAmount = new Phaser.Point(5, 2);

  // the speed at which the letter will "shake" (in ms)
  this.frequency = 100;

  this.lastMoveTimeStamp = 0;

  this.titleTxt = null;
};

Letter.prototype = Object.create(State.prototype);

Letter.prototype.constructor = Letter;

Letter.prototype.onCreate = function () {

  this.titleTxt = this.game.add.text(0, 0, "Trill", {font: '65px Saucer', fill: '#FFFFFF'}, this.group);
  this.titleTxt.anchor.setTo(0.5, 1);
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
  this.titleTxt.position.setTo(0, 0);
};

module.exports = Letter;