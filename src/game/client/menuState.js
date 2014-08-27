var State = require("./state.js");

var MenuState = function (){

  return {

    loadingSprite: null,

    prototype: new State(),

    preload: function (){
      this.game.load.spritesheet('loading','static/img/impatient-loading_67x64.png', 67, 64, 19);
    },

    create: function(){
      this.loadingSprite = this.game.add.sprite(0, 0, 'loading');
      this.resizeLoadingSprite();
      this.loadingSprite.animations.add('load');
      this.loadingSprite.play('load', 20, true);
    },

    onResize: function(dimensions){
      this.resizeLoadingSprite();
    },

    resizeLoadingSprite: function () {
      this.loadingSprite.anchor.setTo(0.5, 0.5);
      this.loadingSprite.position.setTo(this.game.width/2, this.game.height/2);
    }

  };
};

module.exports = MenuState;