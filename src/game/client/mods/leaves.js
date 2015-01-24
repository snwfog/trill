var factory = require('modFactory.js');
var State = require('state/state.js');

var Leaves = function (game) {

    State.call(this, game);

    this.emitter = null;
};

Leaves.prototype = Object.create(State.prototype);

Leaves.prototype.constructor = Leaves;

Leaves.prototype.onCreate = function () {

    this.emitter = this.game.make.emitter(0, 0, 100);
    this.emitter.makeParticles("leaf");
    this.emitter.gravity = 0;
    this.emitter.width = this.game.world.width * 1.1;
    this.emitter.setYSpeed(30, 100);
    this.emitter.z = 0;
    this.emitter.start(false);

    this.group.add(this.emitter);
};

Leaves.prototype.onResize = function (width, height) {

    this.emitter.position.setTo(0, 0);
    this.emitter.width = width * 1.1;
};

module.exports = Leaves;