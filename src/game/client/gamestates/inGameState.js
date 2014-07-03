var InGameState = function InGameState() {
    this.intervalId = void 0;

    this.game.webapi.listener = {
        onConnected: function () {
            return this.game.webapi.createGame();
        },
        onOtherPlayerConnectionLost: function () {
            return console.log('hey ! the other guy quit !');
        },
        onDisconnected: function () {
            return console.log('hey ! it is disconnected!');
        },
        onGameReady: function () {
            console.log('hey ! game is ready !');
            return this.game.webapi.sendPlayerReady();
        },
        onGameEnded: function () {
            clearInterval(this.intervalId);
            return console.log('hey ! game is ended !');
        },
        onPacketReceived: function (packet) {
            console.log('hey ! packet is received : ');
            return console.log(packet);
        },
        OnGameCountDownStart: function (millis) {
            console.log('hey ! game starts in ' + millis + ' millis !');
            return setTimeout(function () {
                return this.intervalId = setInterval(function () {
                    return webapi.sendPacket('packet');
                }, 50);
            }, millis);
        }
    };
}

InGameState.prototype = new Phaser.State()

InGameState.prototype.constructor = InGameState

InGameState.prototype.preload = function() {
    this.game.load.image('hand', 'static/imgs/hand.png');
    this.game.load.image('rope_end', 'static/imgs/rope_end.png');
    this.game.load.image('rope_knot', 'static/imgs/rope_knot');
    this.game.load.image('rope_middle', 'static/imgs/rope_middle.png');
}

InGameState.prototype.create = function() {
    this.game.add.sprite(0, 0, 'hand', this.game.load.image('rope_end', 'static/imgs/rope_end.png'));
    this.game.load.image('rope_knot', 'static/imgs/rope_knot');
    this.game.load.image('rope_middle', 'static/imgs/rope_middle.png');
}