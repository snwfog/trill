# require config.coffee

Trill.WebApi = ->

  ###
  @listener must define the following callbacks

    onGameReady
    onGameEnded
    onPacketReceived(packet)
    onConnectionLost
    onOtherPlayerConnectionLost
  ###
  @listener = undefined

  @_socketId = undefined

  ###
  Starts a persistent connection with server. first parameter of
  callback is the connection socket id, second is an error.
  ###
  connect: (callback) ->

  ###
  Creates game. First parameter of callback is the gamecode, second is
  an error.
  ###
  createGame: (callback) ->

  ###
  Starts a persistent connection with the server
  and join the game with the specified gamecode.

  Options attributes:
    gamecode = the code to join the game with
    callback = the callback to call after operation is finished.
  ###
  join: (options) ->

  ###
  Sends packet to the server

  Options attributes:
    packet = the packet to send.
    callback = the callback to call after operation is finished.
  ###
  sendPacket: (options) ->