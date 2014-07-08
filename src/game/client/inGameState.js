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

    this.game.add.sprite(this.stage.width, 0, 'hand');
}

module.exports = InGameState;