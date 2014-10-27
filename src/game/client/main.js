var trill = require('trill.js');

var game = new Phaser.Game("100%", "100%", Phaser.AUTO, '', null, false, false);

game.webapi = new trill.WebApi({
  url: process.env.TRILL_SERVER_URL
});

game.state.add('inGame', trill.State.InGame);
game.state.add('menu', trill.State.Menu);
game.state.add('create', trill.State.Create);
game.state.add('join', trill.State.Join);
game.state.add('boot', trill.State.Boot, true);