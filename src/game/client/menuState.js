var Letter = require('./plugins/titleLetter.js');

var MenuState = function (){

  return {

    prototype: new Phaser.State(),

    titleTxt: null,

    pluginManager: null,

    create: function(){
      this.titleTxt = this.game.add.text(0, 0, "Trill", {font:'65px Saucer', fill:'#FFFFFF'});
      this.titleTxt.anchor.setTo(0.5, 1);

      this.resize(this.game.width, this.game.height);

      this.pluginManager = new Phaser.PluginManager(this.game);
      var letter = this.pluginManager.add(new Letter(this.game, this.pluginManager, this.titleTxt));
      letter.active = true;
    },

    render: function(){
//      this.game.debug.spriteBounds(this.titleTxt);
//      this.game.debug.cameraInfo(this.game.camera, this.game.world.centerX - 200, this.game.world.centerY);
//      this.game.debug.geom(this.game.world.bounds, '#FF0000', false);
    },

    resize: function(width, height){
      this.game.world.setBounds(0, 0, width, height);
      this.titleTxt.position.setTo(this.game.world.centerX, 0.25 * height);
    },

    update: function(){
      this.pluginManager.update();
    }
  };
};

module.exports = MenuState;