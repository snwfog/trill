var WebApi = function(config) {

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
    this.listener = void 0

    this._socketId = void 0

    this._socket = void 0
}

WebApi.prototype = {

    /**
     Starts a persistent connection with server.
     */
    connect: function(callback) {

        this._socket = io(this.config.url)

        this._socket.on('connect', function() {
            console.log('connected')
            this._socket.emit('requestId')
        })

        this._socket.on('disconnect', function() {
            console.log('disconnected')
        })
        
        this._socket.on('newId', function(id) {
            console.log('new id created :' + id)
            this._socketId = id
            this._fireEvent('onConnected')
        })
           
        this._socket.on('gameReady', function(data) {
            console.log('event gameready fired')
            this._fireEvent('onGameReady')
        })

        this._socket.on('serverPacket', function(data) {
            console.log('event serverPacket fired')
            this._fireEvent('onPacketReceived', data)
        })

        this._socket.on('gameEnded', function(data) {
            console.log('event gameended fired')
            this._fireEvent('onGameEnded', data)
        })

        this._socket.on('otherPlayerConnectionLost', function(data) {
            console.log('event otherplayerconnectionlost fired')
            this._fireEvent('OnOtherPlayerConnectionLost')
        })

        this._socket.on('gameCreated', function(data) {
            console.log('event game created fired')
            console.log(data)
            this._fireEvent('OnGameCreated', data)
        })

        this._socket.on('gameCountDownStart', function(data) {
            this._fireEvent('OnGameCountDownStart', data)
        })
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

WebApi.prototype.constructor = WebApi