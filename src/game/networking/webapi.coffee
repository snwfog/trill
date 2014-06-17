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
      @_requestId()

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

  ###
  Creates game. First parameter of callback is the gamecode, second is
  an error.
  ###
  createGame: ->
    @_socket.emit 'createGame'

  ###
  Starts a persistent connection with the server
  and join the game with the specified gamecode.
  ###
  join: ->
    @_socket.emit 'joinGame'

  ###
  Sends packet to the server

  packet = the packet to send.
  ###
  sendPacket: (packet) ->
    @_socket.emit 'sendPacket', packet

  ###
  Requests a socketId
  ###
  _requestId: ->
    @_socket.emit 'requestId'

  _fireEvent: (eventName, data) ->
    if @listener[eventName]? then @listener[eventName](data)