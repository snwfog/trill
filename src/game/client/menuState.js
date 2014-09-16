var State = require("./state.js");

var MenuState = function (){

  return {

    prototype: new State(),

    titleTxt: null,

    preload: function (){

    },

    create: function(){
      this.titleTxt = this.game.add.text(0, 0, "Trill", {font:'65px Saucer', fill:'#FFFFFF'});
      this.titleTxt.anchor.setTo(0.5, 1);

      this.resizeSprites();
    },

    onResize: function(dimensions){
      this.resizeSprites();
    },

    resizeSprites: function () {
      this.titleTxt.position.setTo(this.game.world.centerX, 0.25 * this.game.world.height);
    }

  };
};

module.exports = MenuState;