WebApi = (config) ->

  ###
  @listener can define the following callbacks

    onConnected
    onDisconnected
    onGameReady
    onGameEnded
    onPacketReceived(packet)
    onDisconnected
    onOtherPlayerConnectionLost
    OnGameCountDownStart
  ###
  @listener = undefined

  @_socketId = undefined

  @_socket = undefined

  ###
  Starts a persistent connection with server.
  ###
  connect: (callback) ->
    @_socket = io config.url

    @_socket.on 'connect', =>
      console.log 'connected'
      @_socket.emit 'requestId'

    @_socket.on 'disconnect', =>
      console.log 'disconnected'

    # custom private events
    @_socket.on 'newId', (id) =>
      console.log 'new id created :' + id
      @_socketId = id
      @_fireEvent 'onConnected'

    # custom listener events
    @_socket.on 'gameReady', (data) =>
      console.log 'event gameready fired'
      @_fireEvent 'onGameReady'

    @_socket.on 'packetreceived', (data) =>
      console.log 'event packetreceived fired'
      @_fireEvent 'onPacketReceived', data

    @_socket.on 'gameEnded', (data) =>
      console.log 'event gameended fired'
      @_fireEvent 'onGameEnded', data

    @_socket.on 'otherPlayerConnectionLost', (data) =>
      console.log 'event otherplayerconnectionlost fired'
      @_fireEvent 'OnOtherPlayerConnectionLost'

    @_socket.on 'gameCreated', (data) =>
      console.log 'event game created fired'
      console.log data
      @_fireEvent 'OnGameCreated', data

    @_socket.on 'gameCountDownStart', (data) =>
      @_fireEvent 'OnGameCountDownStart', data

  ###
  Creates game. First parameter of callback is the gamecode, second is
  an error.
  ###
  createGame: ->
    @_socket.emit 'createGame'

  ###
  Starts a persistent connection with the server
  and join the game with the specified gamecode.
  Sends packet to the server. Server should emit either a
  gameReady response or an error response if game is not joinable.
  ###
  join: ->
    @_socket.emit 'joinGame'

  ###
  Sends packet to the server. Server should not emit
  an event in response
  ###
  sendPacket: (packet) ->
    @_socket.emit 'sendPacket', packet


  ###
  Emits message to notify the server that game start counter can begin.
  Server should answer with OnGameCountDown event
  ###
  sendPlayerReady: () ->
    @_socket.emit 'roundReady'

  ###
  Requests a socketId, server should send a 'newId' event
  in response.
  ###
  _requestId: ->
    @_socket.emit 'requestId'

  _fireEvent: (eventName, data) ->
    console.log @listener
    if @listener[eventName]? then @listener[eventName](data)