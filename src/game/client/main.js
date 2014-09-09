require('./trill.js')

var maxDimensions = {
  w:2048,
  h:1536
};

var initDimensions = {
  w:Math.min(window.innerWidth, maxDimensions.w),
  h:Math.min(window.innerHeight, maxDimensions.h)
};

var game = new Phaser.Game(initDimensions.w, initDimensions.h, Phaser.AUTO, 'game', null, false, false);

game.webapi = new Trill.WebApi({
  url: 'http://localhost:8080'
});

game.state.add('menuState', new Trill.MenuState(), true);
game.state.add('inGameState', new Trill.InGameState());

$(window).resize(function(){
  var width = Math.min (maxDimensions.w, $(window).width());
  var height = Math.min (maxDimensions.h, $(window).height());

  $('canvas')
      .attr('width', width)
      .attr('height', height);

  game.width = width;
  game.height = height;
  game.stage.bounds.width = width;
  game.stage.bounds.height = height;
  game.camera.width = width;
  game.camera.height = height;

  if (game.renderType === Phaser.WEBGL)
  {
    game.renderer.resize(width, height);
  }

  game.state.getCurrentState().onResize({width: width, height:height});

});