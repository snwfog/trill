var State = require("./state.js");

var MenuState = function (){

  return {

    prototype: new State(),

    loadingSprite: null,

    loadingTxt:null,

    preload: function (){
      this.game.load.spritesheet('loading','static/img/impatient-loading_67x64.png', 67, 64, 19);
    },

    create: function(){

      this.loadingSprite = new Phaser.Sprite(this.game, 0, 0, 'loading');
      this.loadingSprite.anchor.setTo(0.5, 0.5);
      this.loadingSprite.animations.add('load');
      this.loadingSprite.play('load', 20, true);
      this.game.stage.addChild(this.loadingSprite);

      this.loadingTxt = this.game.add.text(0, 0, "loading", {font: '65px Inversionz', fill: "#FFFFFF"});
      this.loadingTxt.anchor.setTo(0.5, 0);

      var loadingTxtTween = this.game.add.tween(this.loadingTxt).to({alpha:0}, 700, Phaser.Easing.Cubic.InOut, true, 0, Number.MAX_VALUE, true);

      this.resizeSprites();
    },

    onResize: function(dimensions){
      this.game.world.setBounds(0, 0, dimensions.width, dimensions.height);
      this.resizeSprites();
    },

    resizeSprites: function () {
      this.loadingSprite.position.setTo(this.game.world.centerX, this.game.world.centerY);
      this.loadingTxt.position.setTo(this.loadingSprite.position.x, this.loadingSprite.position.y + 50);
    }

  };
};

module.exports = MenuState;