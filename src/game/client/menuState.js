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
      this.loadingSprite = this.game.add.sprite(0, 0, 'loading');
      this.loadingSprite.anchor.setTo(0.5, 0.5);
      this.loadingSprite.animations.add('load');
      this.loadingSprite.play('load', 20, true);

      this.loadingTxt = this.game.add.text(0, 0, "loading", {font: '65px Inversionz', fill: "#FFFFFF"});
      this.loadingTxt.anchor.setTo(0.5, 0);

//      var loadingTxtTween = this.game.add.tween(this.loadingTxt).to({});

      this.resizeSprites();
    },

    onResize: function(dimensions){
      this.resizeSprites();
    },

    resizeSprites: function () {
      this.loadingSprite.position.setTo(this.game.width/2, this.game.height/2);

      this.loadingTxt.position.setTo(this.loadingSprite.position.x, this.loadingSprite.position.y + 50);
    }

  };
};

module.exports = MenuState;