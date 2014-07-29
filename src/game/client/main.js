var webapi = require('./webapi.js');
var ingamestate = require('./inGameState.js');

var game = new Phaser.Game(760, 1024, Phaser.AUTO, 'game', null, false, false);

game['webapi'] = new webapi({
  url: 'http://localhost:8080/'
});

game.state.add('inGameState', new ingamestate(), true);