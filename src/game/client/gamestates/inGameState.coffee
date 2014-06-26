
InGameState = ->

  @intervalId = undefined

  @game.webapi.listener =

    onConnected: ->
      @game.webapi.createGame()

    onOtherPlayerConnectionLost: ->
      console.log 'hey ! the other guy quit !'

    onDisconnected: ->
      console.log 'hey ! it is disconnected!'

    onGameReady: ->
      console.log 'hey ! game is ready !'
      @game.webapi.sendPlayerReady()

    onGameEnded: ->
      clearInterval(@intervalId)
      console.log 'hey ! game is ended !'

    onPacketReceived: (packet) ->
      console.log 'hey ! packet is received : '
      console.log packet

    OnGameCountDownStart: (millis) ->
      console.log 'hey ! game starts in ' + millis + ' millis !'

      setTimeout( () ->

        @intervalId = setInterval( () ->
          webapi.sendPacket 'packet'
        , 50)

      , millis)

#    @game.webapi.connect()

  preload: ->
    @game.load.image 'hand', 'static/imgs/hand.png'
    @game.load.image 'rope_end', 'static/imgs/rope_end.png'
    @game.load.image 'rope_knot', 'static/imgs/rope_knot'
    @game.load.image 'rope_middle', 'static/imgs/rope_middle.png'

  create: ->
    @game.add.sprite 0, 0, 'hand',
    @game.load.image 'rope_end', 'static/imgs/rope_end.png'
    @game.load.image 'rope_knot', 'static/imgs/rope_knot'
    @game.load.image 'rope_middle', 'static/imgs/rope_middle.png'

InGameState.prototype = new Phaser.State()