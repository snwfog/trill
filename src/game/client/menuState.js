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

      this.resize(this.game.width, this.game.height);
    },

    render: function(){
//      this.game.debug.spriteBounds(this.titleTxt);
//      this.game.debug.cameraInfo(this.game.camera, this.game.world.centerX - 200, this.game.world.centerY);
//      this.game.debug.geom(this.game.world.bounds, '#FF0000', false);
    },

    resize: function(width, height){
      this.titleTxt.position.setTo(this.game.world.centerX, 0.25 * height);
    }
  };
};

module.exports = MenuState;