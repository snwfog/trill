var trill = require('trill.js');

var game = new Phaser.Game("100%", "100%", Phaser.AUTO, '', null, false, false);

game.webapi = new trill.WebApi({
  url: process.env.TRILL_SERVER_URL
});

game.state.add('inGame', new trill.State.InGame());
game.state.add('menu', new trill.State.Menu());
game.state.add('boot', new trill.State.Boot(), true);