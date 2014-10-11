var State = require('state/state.js');

var Popup = function(game, parms){

  State.call(this, game);

  this.parms = parms || {};
  this.text = null;
  this.window = null;

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

  this._blockingImage = new Phaser.Image(this.game, 0, 0, new Phaser.BitmapData(this.game, '_blockBitmapData', 1, 1).setPixel(0, 0, 0, 255, 255));
  this._blockingImage.inputEnabled = true;
  this._blockingImage.anchor.setTo(0.5, 0.5);
  this._blockingImage.width = 0;
  this._blockingImage.height = 0;

  this.group.add(this._blockingImage);

  this.contentGroup = this.add.group(this.group, 'popupContentGroup');

  this.window = this.add.sprite(0, 0, 'greySheet', 'grey_panel', this.contentGroup);
  this.window.anchor.setTo(0.5, 0.5);
  this.window.width = 150;
  this.window.height = 150;

  this.text = this.game.add.text(0, 0, this.parms.text || '', {font: '15px Future', fill: '#EEEEEE'}, this.contentGroup);
  this.text.anchor.setTo(0.5, 0.5);

  this.contentGroup.scale.set(0.001, 0.001);
  this.contentGroup.visible = false;
};

Popup.prototype.onResize = function () {
  this.contentGroup.position.setTo(0, 0);

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

  this.tweens.remove(this.tween);

  this.contentGroup.visible = true;
  this.tween = this.tweens.create(this.contentGroup.scale).to({x: 1, y: 1}, 300, Phaser.Easing.Linear.None, true);
};

Popup.prototype.dismiss = function () {
  this.tweens.remove(this.tween);
  this.tween = this.tweens.create(this.contentGroup.scale).to({x: 0.001, y: 0.001}, 300, Phaser.Easing.Linear.None, true)
      .onComplete.add(function(){
        this.contentGroup.visible = false;
        this._blockingImage.width = 0;
        this._blockingImage.height = 0;
      }, this);
};

module.exports = Popup;