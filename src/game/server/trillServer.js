
var e = require('express');
var sio = require('socket.io');
var http = require('http');

var app = e();
var server = http.createServer(app);
var io = sio.listen(server);

server.listen(8088);

var gameId = 1;
var gameInstances = [];

/** Average clicking speed, in numOfClicks/millisecs */
var averageSpeed = 62 / (10 * 1000);
var players = [];
var playerStorage = {};

var info = logFactory("info");

io.sockets.on('connection', function(socket) {
  info("New connection #", socket.id);

  info("Statistic Summary");
  info("================================================");
  info("There are currently", Object.keys(io.sockets.connected).length, "connected client(s)");
  info("================================================");
});
//function (server) {
//  var io = socketio.listen(server);
//  io.sockets.on('connection', function (socket) {
//    socket.on('requestId', function () {
//      $log.info("Id requested");
////      // Associate this player with this current playerId
////      var newPlayerId = playerId++;
////      // Transparent to the client, we'll just give the same cached Id
////      var newPlayerId = isReconnect(socket) ? getPreviousPlayerId(socket) : playerId++;
////      $log.warn("A player has request for a game Id.");
////      if (isReconnect(socket)) {
////        $log("WARN: Player is attempting for a reconnection!")
////        var player = clientIdStorage[getPreviousPlayerId(socket)] || new Player(socket);
////        // FIXME: Constructor is missing a parameter here...
////        // FIXME: Actually the constructor is totally wrong here...
////      }
////
////      // Else its just a new player request
////      // Associate in the local server side cache
////      clientIdStorage[newPlayerId] = player;
//      return socket.emit('newId', "");
//    });
//
//
//    socket.on('createGame', function() {
//      return socket.emit('gameReady');
//    });
//
//
//    socket.on('joinGame', function() {
//      return socket.emit('gameReady');
//    });
//
//
//    socket.on('sendPacket', function(data) {
//      return socket.broadcast.emit('packet Received', data);
//    });
//
//
//    socket.on('roundReady', function() {
//
//      socket.emit('gameCountDownStart', 3 * 1000);
//
//      setTimeout(function(){
//
//          var intervalId = setInterval(function(){
//
//              // send an random speed of +- 10% of the averageSpeed
//              socket.emit('serverPacket', averageSpeed + ((Math.random() - 0.5) * 0.2 * averageSpeed));
//          }, 100);
//
//         setTimeout(function(){
//             clearInterval(intervalId);
//             socket.emit('gameEnded');
//         }, 5 * 1000);
//
//      }, 3 * 1000);
//    });
//
//    return getGameInstance(socket);
//  });
//
//  return setInterval((function () {
//    var waitingGames;
//    if ((waitingGames = hasWaitingGame())) {
//      return $log.info("There are currently waiting game");
//    }
//  }), 5000);
//};
//
//var hasWaitingGame = function () {
//  return (gameInstances.filter(function (game) {
//    return game.isWaiting();
//  })).length !== 0;
//};
//
//var isReconnect = function (socket) {
//  return true; // FIXME: Mock
//}
//
//var getGameInstance = function (socket) {
//  var instance;
//  var p = new Player(socket.id);
//
//  // Put the player with his socket id to the playerStorage
//  // TODO: Make sure the client will send the proper client Id if it has any
//  // TODO: from its localStorage cache and is not expired
//  playerStorage[socket.id] = p;
//
//
//  if ((instance = getNextWaitingGame()) === void 0) {
//    instance = new GameInstance(gameId++);
//  }
//
//  $log.info("INFO: There are currently " + players.length
//      + " players in " + gameInstances.length + " games.");
//
//  instance.assignPlayerToGame(p);
//  return gameInstances.push(instance);
//};
//
//var getNextWaitingGame = function () {
//  var gameInstance, i, len;
//  for (i = 0, len = gameInstances.length; i < len; i++) {
//    gameInstance = gameInstances[i];
//    if (gameInstance.isWaiting()) {
//      return gameInstance;
//    }
//  }
//};
//
var Player = (function () {
  function Player(socketId, gameInstance) {
    this.socketId = socketId;
    this.gameInstance = gameInstance;
    this.isExpired = false;

    this.connectTime = Date.now(); // unix time, cuz who cares? its just a time id

    $log.info("Adding new player " + this.socketId + " to the player array");
    players.push(this);
  }

  Player.prototype.id = Player.socketId;
  var players = [];

  return Player;

})();

var GameInstance = (function () {
  function GameInstance(id, playerOne, playerTwo) {
    this.id = id;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }

  GameInstance.prototype.isWaiting = function () {
    return this.playerOne === void 0 || this.playerTwo === void 0;
  };

  GameInstance.prototype.isEmpty = function () {
    return this.playerOne === void 0 && this.playerTwo === void 0;
  };

  GameInstance.prototype.isFull = function () {
    return this.playerOne !== void 0 && this.playerTwo !== void 0;
  };

  GameInstance.prototype.assignPlayerToGame = function (player) {
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


function logFactory(type) {
  if (type in console) {
    return function () {
      var message = Array.prototype.shift.apply(arguments);
      if (typeof(message) === "string") {
        Array.prototype.unshift.call(arguments, type.toUpperCase() + ": " + message);
      }

      console[type].apply(console, arguments);
    };
  }

  throw "Cannot instantiate log for " + type;
}

var $log = {};
['warn', 'error', 'info', 'log'].forEach(function (type) {
  $log[type] = logFactory(type);
});

module.exports = {listen: function (server) {
}};