var socketio = require('socket.io');

/** Average clicking speed, in numOfClicks/millisecs */
var averageSpeed = 62 / (10 * 1000);

exports.listen = function (server) {
  var io = socketio.listen(server);
  io.sockets.on('connection', function (socket) {
    socket.on('requestId', function () {

      return socket.emit('newId', "");
    });


    socket.on('createGame', function () {

      setTimeout(function () {
        socket.emit('gameCreated', 1337);
        setTimeout(function () {
          socket.emit('gameReady');
        }, 2000);
      }, 2000);
    });

    socket.on('joinGame', function () {
      return socket.emit('gameReady');
    });


    socket.on('sendPacket', function (data) {
      return socket.broadcast.emit('packet Received', data);
    });


    socket.on('roundReady', function () {

      socket.emit('gameCountDownStart', 3 * 1000);

      setTimeout(function () {

        var intervalId = setInterval(function () {

          // send an random speed of +- 10% of the averageSpeed
          socket.emit('serverPacket', averageSpeed + ((Math.random() - 0.5) * 0.2 * averageSpeed));
        }, 100);

        setTimeout(function () {
          clearInterval(intervalId);
          socket.emit('gameEnded');
        }, 5 * 1000);

      }, 3 * 1000);
    });

  });

};