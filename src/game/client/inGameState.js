var InGameState = function InGameState() {

    this.intervalId = null;
}

InGameState.prototype = new Phaser.State()

InGameState.prototype.constructor = InGameState

InGameState.prototype.preload = function() {

    this.game.load.image('hand', 'static/imgs/hand.png');
    this.game.load.image('rope_knot', 'static/imgs/rope_knot.png');
    this.game.load.image('rope_part', 'static/imgs/rope_middle.png');
}

InGameState.prototype.create = function() {

    var state = this;
    state.game.webapi.listener = {
        onConnected: function () {
            state.game.webapi.createGame();
        },
        onOtherPlayerConnectionLost: function () {
            console.log('hey ! the other guy quit !');
        },
        onDisconnected: function () {
            console.log('hey ! it is disconnected!');
        },
        onGameReady: function () {
            console.log('hey ! game is ready !');
            state.game.webapi.sendPlayerReady();
        },
        onGameEnded: function () {
            clearInterval(state.intervalId);
            console.log('hey ! game is ended !');
        },
        onPacketReceived: function (packet) {
            console.log('hey ! packet is received : ');
            console.log(packet);
        },
        OnGameCountDownStart: function (millis) {
            console.log('hey ! game starts in ' + millis + ' millis !');
            setTimeout(function () {
                state.intervalId = setInterval(function () {
                    state.game.webapi.sendPacket('packet');
                }, 50);
            }, millis);
        }
    };
    this.game.webapi.connect();

    // Create the rope
    var rope = this.game.add.group();
    rope.position.x = this.game.width/2;
    rope.position.y = this.game.height/2;

    // First add the knot at the center of the screen
    var knot = rope.create(0,0, 'rope_knot');
    knot.anchor.setTo(0.5, 0.5);

    // Then add rope parts that extend from the knot to the top and
    // bottom of the screen
    var ropeHeight = this.game.height/2;
    var ropePartImg = this.game.cache.getImage('rope_part');

    var ropeTop = this.game.add.tileSprite(0, 0, ropePartImg.width, ropeHeight, 'rope_part');
    rope.addChild(ropeTop);
    ropeTop.anchor.setTo(0.5, 1);
    ropeTop.position.setTo(knot.x, knot.y - knot.height/2);

    var ropeBottom = this.game.add.tileSprite(0, 0, ropePartImg.width, ropeHeight, 'rope_part');
    rope.addChild(ropeBottom);
    ropeBottom.anchor.setTo(0.5, 0);
    ropeBottom.position.setTo(knot.x, knot.y + knot.height/2);

    // Create top hand
    var topHand = this.game.add.sprite(0, 0, 'hand');
    topHand.anchor.setTo(0.34, 0.5);
    topHand.scale.x = -1;

    // Display hand at top middle of the stage
    topHand.position.x = this.game.width/2;
    topHand.position.y = topHand.height/2;

    // Create bottom hand
    var bottomHand = this.game.add.sprite(0, 0, 'hand');
    bottomHand.anchor.setTo(0.34, 0.5);

    // Display hand at bottom middle of the stage
    bottomHand.position.x = this.game.width/2;
    bottomHand.position.y = this.game.height - bottomHand.height/2;
}

module.exports = InGameState;