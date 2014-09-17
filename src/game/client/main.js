var trill = require('./trill.js')

var maxDimensions = {
  w:2048,
  h:1536
};

var initDimensions = {
  w:Math.min($(window).width(), maxDimensions.w),
  h:Math.min($(window).height(), maxDimensions.h)
};

var game = new Phaser.Game(initDimensions.w, initDimensions.h, Phaser.AUTO, 'game', null, false, false);

game.webapi = new trill.WebApi({
  url: process.env.TRILL_SERVER_URL
});

game.state.add('inGame', new trill.InGameState());
game.state.add('menu', new trill.MenuState());
game.state.add('boot', new trill.BootState(), true);

$(window).resize(function(){

  var width = Math.min (maxDimensions.w, $(window).width());
  var height = Math.min (maxDimensions.h, $(window).height());

  window.requestAnimationFrame(function (){

    game.width = width;
    game.height = height;
    game.camera.width = width;
    game.camera.height = height;
    game.world.bounds = new Phaser.Rectangle(0, 0, width, height);

    if (game.renderType === Phaser.WEBGL)
    {
      game.renderer.resize(width, height);
    }

    game.state.getCurrentState().onResize({width: width, height:height});

  });

});