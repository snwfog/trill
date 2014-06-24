#require webapi.coffee

###
  This is a simple state template to use for getting a Phaser game up
  and running quickly. Simply add your own game logic to the default
  state object or delete it and make your own.
###
state =
    init: ->
        # Delete this init block or replace with your own logic
        # Create simple text display for current Phaser version
        text = "Phaser Version " + Phaser.VERSION + " works! Nice !"
        style = { font: "24px Arial", fill: "#fff", align: "center" }
        t = game.add.text this.world.centerX, this.world.centerY, text, style
        t.anchor.setTo 0.5, 0.5

    preload: ->
        # State preload logic goes here

    create: ->
        # State create logic goes here

    update: ->
        # State Update Logic goes here.

game = new Phaser.Game(
    800,
    480,
    Phaser.AUTO,
    'game',
    state
)
webapi = new WebApi({url:'http://localhost:8080/'})

webapi.listener =

  onConnected: ->
    webapi.createGame()

  onOtherPlayerConnectionLost: ->
    console.log 'hey ! the other guy quit !'

  onDisconnected: ->
    console.log 'hey ! it is disconnected!'

  onGameReady: ->
    console.log 'hey ! game is ready !'
    webapi.sendPlayerReady()

  onGameEnded: ->
    console.log 'hey ! game is ended !'

  onPacketReceived: (packet) ->
    console.log 'hey ! packet is received : '
    console.log packet

  OnGameCountDownStart: (millis) ->
    console.log 'hey ! game starts in ' + millis + ' millis !'

    setTimeout( () ->

      setInterval( () ->

        webapi.sendPacket 'packet'
      , 50)

    , millis)

webapi.connect()


