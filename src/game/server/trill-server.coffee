socketio = require('socket.io')
gameId = 1
players = []
gameInstances = []

exports.listen = (server) ->
  io = socketio.listen(server)
  io.set('log level', 1)
  io.sockets.on 'connection', (socket) ->

    socket.on 'requestId', ->
      socket.emit 'newId', 'fake-id-999'

    socket.on 'createGame', ->
      socket.emit 'gameReady'

    socket.on 'joinGame', ->
      socket.emit 'gameReady'

    socket.on 'sendPacket', (data) ->
      socket.broadcast.emit 'packet Received', data

    socket.on 'roundReady', ->
      socket.broadcast.emit 'gameCountDownStart'

    getGameInstance(socket)

getGameInstance = (socket) ->
  p = new Player(socket.id)
  if (instance = getNextWaitingGame() == undefined)
    instance = new GameInstance(gameId++)

  instance.assignPlayerToGame(p)
  gameInstances << instance

getNextWaitingGame = ->
  for gameInstance in gameInstances
    if (gameInstance.isWaiting())
      return gameInstance

class Player
  constructor: (@socketId, @gameInstance) ->
  id: @socketId # alias for @socketId

class GameInstance
  constructor: (@id, @playerOne, @playerTwo) ->
  isWaiting: ->
    @playerOne == undefined || @playerTwo == undefined
  isEmpty: ->
    @playerOne == undefined && @playerTwo == undefined
  isFull: ->
    @playerOne != undefined && @playerTwo != undefined

  assignPlayerToGame: (player) ->
    console.log("Assigning #{player.socketId} to a game instance #{@id}")
    if @playerOne == undefined
      @playerOne = player
    else if @playerTwo == undefined
      @playerTwo = player
    else
      throw "Cannot assign player to an none empty game instance";
