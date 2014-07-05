var InGameState = function InGameState() {

    this.intervalId = null;
}

InGameState.prototype = new Phaser.State()

InGameState.prototype.constructor = InGameState

InGameState.prototype.preload = function() {

    this.game.load.image('hand', 'static/imgs/hand.png');
    this.game.load.image('rope_end', 'static/imgs/rope_end.png');
    this.game.load.image('rope_knot', 'static/imgs/rope_knot.png');
    this.game.load.image('rope_middle', 'static/imgs/rope_middle.png');
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


    var topHand = this.game.add.sprite(0, 0, 'hand');
    topHand.anchor.setTo(0.34, 0.5);
    topHand.scale.x = -1;

    // Display hand at top middle of the stage
    topHand.position.x = this.game.width/2;
    topHand.position.y = topHand.height/2;

    var bottomHand = this.game.add.sprite(0, 0, 'hand');
    bottomHand.anchor.setTo(0.34, 0.5);

    // Display hand at bottom middle of the stage
    bottomHand.position.x = this.game.width/2;
    bottomHand.position.y = this.game.height - bottomHand.height/2;


}

module.exports = InGameState;