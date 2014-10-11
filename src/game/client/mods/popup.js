var State = require('state/state.js');
var Button = require('mods/button.js');

var Popup = function(game, parms){

  State.call(this, game);

  this.parms = parms || {};

  this.text = null;
  this.window = null;
  this.button = null;

  /**
   * Sprite that takes the whole screen so that nothing but the
   * popup mods are clickable.
   *
   * @type {Phaser.Sprite}
   * @private
   */
  this._blockingImage = null;

  this.tween = null;

  this.contentGroup = null;
};

Popup.prototype = Object.create(State.prototype);

Popup.prototype.constructor = Popup;

Popup.prototype.onCreate = function () {

  this._blockingImage = new Phaser.Image(this.game, 0, 0, new Phaser.BitmapData(this.game, '_blockBitmapData', 1, 1).setPixel32(0, 0, 0, 0, 0, 128));
  this._blockingImage.inputEnabled = true;
  this._blockingImage.anchor.setTo(0.5, 0.5);
  this._blockingImage.width = 0;
  this._blockingImage.height = 0;

  this.group.add(this._blockingImage);

  this.contentGroup = this.add.group(this.group, 'popupContentGroup');

  this.window = this.add.sprite(0, 0, 'greySheet', 'grey_panel', this.contentGroup);
  this.window.anchor.setTo(0.5, 0.5);
  this.window.width = 450;
  this.window.height = 300;

  this.text = this.game.add.text(0, 0, this.parms.text || '', {font: '15px Future', fill: '#000000'}, this.contentGroup);
  this.text.anchor.setTo(0.5, 0.5);

  this.button = new Button(this.game, {
    sheet: "greySheet",
    up: "grey_button08",
    down: "grey_button09",
    text: "ok",
    color: '#000000',
    textStyle: '15px Future'
  });
  this.addMod(this.button, this.contentGroup);
  this.contentGroup.visible = false;
};

Popup.prototype.onPostCreate = function () {
  this.button.button.onInputUp.add(function () {
    this.dismiss();
  }, this);
};

Popup.prototype.onResize = function () {
  this.contentGroup.position.setTo(0, 0);

  this.button.group.position.setTo(
      0,
          this.window.height / 2 - this.button.bounds.height / 2 - 50
  );

  this._blockingImage.x = 0;
  this._blockingImage.y = 0;
  if (this.contentGroup.visible) {
    this._blockingImage.width = this.game.width;
    this._blockingImage.height = this.game.height;
  }
};

Popup.prototype.show = function () {
  this._blockingImage.width = this.game.width;
  this._blockingImage.height = this.game.height;

  this.contentGroup.visible = true;

  this.tweens.remove(this.tween);
  this.contentGroup.scale.set(0.1, 0.1);
  this.tween = this.tweens.create(this.contentGroup.scale).to({x: 1, y: 1}, 300, Phaser.Easing.Linear.None, true);
};

Popup.prototype.dismiss = function () {
  this.tweens.remove(this.tween);
  this.tween = this.tweens.create(this.contentGroup.scale).to({x: 0.1, y: 0.1}, 300, Phaser.Easing.Linear.None, true)
      .onComplete.add(function(){
        this.contentGroup.visible = false;
        this._blockingImage.width = 0;
        this._blockingImage.height = 0;
      }, this);
};

module.exports = Popup;