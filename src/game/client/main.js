var trill = require('./trill.js')

var game = new Phaser.Game("100%", "100%", Phaser.AUTO, '', null, false, false);

game.webapi = new trill.WebApi({
  url: process.env.TRILL_SERVER_URL
});

game.state.add('inGame', new trill.InGameState());
game.state.add('menu', new trill.MenuState());
game.state.add('boot', new trill.BootState(), true);