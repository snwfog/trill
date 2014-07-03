var WebApi = function(config) {

    this.config = config;

    /**
     @listener can define the following callbacks:

         onConnected
         onDisconnected
         onGameReady
         onGameEnded
         onPacketReceived(packet)
         onDisconnected
         onOtherPlayerConnectionLost
         OnGameCountDownStart
     */
    this.listener = null;

    this._socketId = null;

    this._socket = null;
}

WebApi.prototype = {

    /**
     Starts a persistent connection with server.
     */
    connect: function() {

        var api = this;
        api._socket = io(this.config.url);

        api._socket.on('connect', function() {
            console.log('connected');
            api._socket.emit('requestId');
        });

        api._socket.on('disconnect', function() {
            console.log('disconnected');
            api._fireEvent('onDisconnected');
        });

        api._socket.on('newId', function(id) {
            console.log('new id created :' + id);
            api._socketId = id;
            api._fireEvent('onConnected');
        });

        api._socket.on('gameReady', function(data) {
            console.log('event gameready fired')
            api._fireEvent('onGameReady')
        });

        api._socket.on('serverPacket', function(data) {
            console.log('event serverPacket fired')
            api._fireEvent('onPacketReceived', data)
        });

        api._socket.on('gameEnded', function(data) {
            console.log('event gameended fired')
            api._fireEvent('onGameEnded', data)
        });

        api._socket.on('otherPlayerConnectionLost', function(data) {
            console.log('event otherplayerconnectionlost fired')
            api._fireEvent('OnOtherPlayerConnectionLost')
        });

        api._socket.on('gameCreated', function(data) {
            console.log('event game created fired')
            console.log(data)
            api._fireEvent('OnGameCreated', data)
        });

        api._socket.on('gameCountDownStart', function(data) {
            api._fireEvent('OnGameCountDownStart', data)
        });
    },

    /**
     Creates game. First parameter of callback is the gamecode, second is
     an error.
     */
    createGame: function() {
         this._socket.emit('createGame')
    },

    /**
     Starts a persistent connection with the server
     and join the game with the specified gamecode.
     Sends packet to the server. Server should emit either a
     gameReady response or an error response if game is not joinable.
     */
    join: function() {
         this._socket.emit('joinGame')
    },

    /**
     Sends packet to the server. Server should not emit
     an event in response
     */
    sendPacket: function(packet) {
         this._socket.emit('sendPacket', packet)
    },

    /**
     Emits message to notify the server that game start counter can begin.
     Server should answer with OnGameCountDown event
     */
    sendPlayerReady: function() {
        this._socket.emit('roundReady')
    },

    /**
     Requests a socketId, server should send a 'newId' event
     in response.
     */
    _requestId: function() {
        this._socket.emit('requestId')
    },

    _fireEvent: function(eventName, data) {
        console.log(this.listener)
        if (this.listener[eventName] != null) {
            this.listener[eventName](data)
        }
    }

}

WebApi.prototype.constructor = WebApi;

module.exports = WebApi;