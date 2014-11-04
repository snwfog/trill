var WebApi = function (config) {

  return {

    /**
     @_listener can define the following callbacks:

     connected
     disconnected
     gameReady
     gameEnded
     packetReceived (packet)
     disconnected
     otherPlayerConnectionLost
     gameCountDownStart
     */
    _listener: {},

    _socketId: {},

    _socket: null,

    /**
     Starts a persistent connection with server.
     */
    connect: function () {

      var api = this;
      api._socket = io(config.url, {
        forceNew: true
      });

      api._socket
          .on('connect', function () {
            console.log('connected');
            this.emit('requestId');
          })

          .on('disconnect', function () {
            console.log('disconnected');
            api._fireEvent('disconnected');
          })

          .on('newId', function (id) {
            console.log('new id created :' + id);
            api._socketId = id;
            api._fireEvent('connected');
          })

          .on('gameReady', function (data) {
            console.log('event gameready fired')
            api._fireEvent('gameReady')
          })

          .on('serverPacket', function (data) {
            console.log('event serverPacket fired')
            api._fireEvent('packetReceived', data)
          })

          .on('gameEnded', function (data) {
            console.log('event gameended fired')
            api._fireEvent('gameEnded', data)
          })

          .on('otherPlayerConnectionLost', function (data) {
            console.log('event otherplayerconnectionlost fired')
            api._fireEvent('otherPlayerConnectionLost')
          })

          .on('gameCreated', function (data) {
            console.log('event game created fired')
            console.log(data)
            api._fireEvent('gameCreated', data)
          })

          .on('gameCountDownStart', function (data) {
            api._fireEvent('gameCountDownStart', data)
          });
    },

    /**
     * Stops listening to web sockets events and ends
     * the socket connection.
     */
    disconnect: function () {
      this.off();
      this._socket.close();
      this._socket = null;
    },

    /**
     * Stops listening to web sockets events
     */
    off: function () {
      this._listener = {};
    },

    /**
     Creates game. First parameter of callback is the gamecode, second is
     an error.
     */
    createGame: function () {
      this._socket.emit('createGame')
    },

    /**
     Starts a persistent connection with the server
     and join the game with the specified gamecode.
     Sends packet to the server. Server should emit either a
     gameReady response or an error response if game is not joinable.
     */
    join: function (gameCode) {
      this._socket.emit('joinGame', gameCode);
    },

    /**
     Sends packet to the server. Server should not emit
     an event in response
     */
    sendPacket: function (packet) {
      this._socket.emit('sendPacket', packet)
    },

    /**
     Emits message to notify the server that game start counter can begin.
     Server should answer with OnGameCountDown event
     */
    sendPlayerReady: function () {
      this._socket.emit('roundReady')
    },

    on: function (eventName, callback) {
      this._listener[eventName] = callback;
      return this;
    },

    /**
     Requests a socketId, server should send a 'newId' events
     in response.
     */
    _requestId: function () {
      this._socket.emit('requestId')
    },

    _fireEvent: function (eventName, data) {
      console.log(this._listener)
      if (this._listener[eventName] !== undefined) {
        this._listener[eventName](data)
      }
    }
  };

};

module.exports = WebApi;