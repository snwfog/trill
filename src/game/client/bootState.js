var State = require("./state.js");

var BootState = function (){

  return {

    prototype: new State(),

    loadingSprite: null,

    loadingTxt:null,

    preload: function (){
      this.game.load.spritesheet('loading','static/img/impatient-loading_67x64.png', 67, 64, 19);
    },

    create: function(){

      this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

      // Allow the camera to go anywhere
      this.game.camera.bounds = null;
      this.game.camera.position.setTo(0, 0);

      this.loadingSprite = this.game.add.sprite(0, 0, 'loading');
      this.loadingSprite.anchor.setTo(0.5, 0.5);
      this.loadingSprite.animations.add('load');
      this.loadingSprite.play('load', 20, true);

      this.loadingTxt = this.game.add.text(0, 0, "loading", {font: '65px Inversionz', fill: "#FFFFFF"});
      this.loadingTxt.anchor.setTo(0.5, 0);

      var loadingTxtTween = this.game.add.tween(this.loadingTxt).to({alpha:0}, 700, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);
      this.resizeSprites();

      this.game.state.start('menu');
    },

    resize: function(width, height){
      this.game.world.setBounds(0, 0, width, height);
      this.resizeSprites();
    },

    resizeSprites: function () {
      this.loadingSprite.position.setTo(this.game.world.centerX, this.game.world.centerY);
      this.loadingTxt.position.setTo(this.loadingSprite.position.x, this.loadingSprite.position.y + 50);
    }

  };
};

module.exports = BootState;