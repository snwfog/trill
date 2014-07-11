var socketio = require('socket.io');
var $log = require('util').log;

var gameId = 1;
var players = [];
var gameInstances = [];

exports.listen = function(server) {
  var io = socketio.listen(server);
  io.set('log level', 1);
  io.sockets.on('connection', function(socket) {
    socket.on('requestId', function() {
      return socket.emit('newId', 'fake-id-999');
    });
    socket.on('createGame', function() {
      return socket.emit('gameReady');
    });
    socket.on('joinGame', function() {
      return socket.emit('gameReady');
    });
    socket.on('sendPacket', function(data) {
      return socket.broadcast.emit('packet Received', data);
    });
    socket.on('roundReady', function() {

      socket.emit('gameCountDownStart', 3 * 1000);

      setTimeout(function(){

          var intervalId = setInterval(function(){
              socket.emit('serverPacket', Math.random());
          }, 100);

         setTimeout(function(){
             clearInterval(intervalId);
             socket.emit('gameEnded');
         }, 5 * 1000);

      }, 3 * 1000);

    });
    return getGameInstance(socket);
  });
  return setInterval((function() {
    var waitingGames;
    if ((waitingGames = hasWaitingGame())) {
      return $log("There are currently waiting game");
    }
  }), 5000);
};

var hasWaitingGame = function() {
  return (gameInstances.filter(function(game) {
    return game.isWaiting();
  })).length !== 0;
};

var getGameInstance = function(socket) {
  var instance;
  var p = new Player(socket.id);
  $log("$$$ A new player has joined the game! " + p);
  players.push(p);

  if ((instance = getNextWaitingGame()) === void 0) {
    instance = new GameInstance(gameId++);
  }

  $log("INFO: There are currently " + players.length
      + " players in " + gameInstances.length + " games.");

  instance.assignPlayerToGame(p);
  return gameInstances.push(instance);
};

var getNextWaitingGame = function() {
  var gameInstance, _i, _len;
  for (_i = 0, _len = gameInstances.length; _i < _len; _i++) {
    gameInstance = gameInstances[_i];
    if (gameInstance.isWaiting()) {
      return gameInstance;
    }
  }
};

var Player = (function() {
  function Player(socketId, gameInstance) {
    this.socketId = socketId;
    this.gameInstance = gameInstance;
  }

  Player.prototype.id = Player.socketId;

  return Player;

})();

var GameInstance = (function() {
  function GameInstance(id, playerOne, playerTwo) {
    this.id = id;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }

  GameInstance.prototype.isWaiting = function() {
    return this.playerOne === void 0 || this.playerTwo === void 0;
  };

  GameInstance.prototype.isEmpty = function() {
    return this.playerOne === void 0 && this.playerTwo === void 0;
  };

  GameInstance.prototype.isFull = function() {
    return this.playerOne !== void 0 && this.playerTwo !== void 0;
  };

  GameInstance.prototype.assignPlayerToGame = function(player) {
    console.log("Assigning " + player.socketId + " to a game instance " + this.id);
    if (this.playerOne === void 0) {
      return this.playerOne = player;
    } else if (this.playerTwo === void 0) {
      return this.playerTwo = player;
    } else {
      throw "Cannot assign player to an none empty game instance";
    }
  };

  return GameInstance;

})();