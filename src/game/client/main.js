var webapi = require('./webapi.js');
var ingamestate = require('./inGameState.js');


var maxDimensions = {
  w:2048,
  h:1536
};

var initDimensions = {
  w:Math.min(window.innerWidth, maxDimensions.w),
  h:Math.min(window.innerHeight, maxDimensions.h)
};

var game = new Phaser.Game(initDimensions.w, initDimensions.h, Phaser.AUTO, 'game', null, false, false);

game['webapi'] = new webapi({
  url: 'https://tlyivpvrap.localtunnel.me'
});

$(window).resize(function(){
  var width = Math.min (maxDimensions.w, $(window).width());
  var height = Math.min (maxDimensions.h, $(window).height());

  game.width = width;
  game.height = height;
  game.stage.bounds.width = width;
  game.stage.bounds.height = height;

  if (game.renderType === Phaser.WEBGL)
  {
    game.renderer.resize(width, height);
  }

});

game.state.add('inGameState', new ingamestate(), true);