var factory = require('mods/factory.js');
var State = require('state/state.js');

var Leaves = function (game) {

    State.call(this, game);

    this.emitter = null;
    this.timer = null;
};

Leaves.prototype = Object.create(State.prototype);

Leaves.prototype.constructor = Leaves;

Leaves.prototype.onCreate = function () {

    this.emitter = this.game.make.emitter(0, 0, 50);
    this.emitter.makeParticles("leaf");
    this.emitter.gravity = 0;
    this.emitter.setYSpeed(20, 60);
    this.emitter.setXSpeed(10, 20);
    this.emitter.setSize(this.game.world.width * 1.1, 10);
    this.emitter.setRotation(-5, 5);
    this.group.add(this.emitter);
    this.emitter.start(false, 10000);

    this.timer = new Phaser.Timer(this.game);
};

Leaves.prototype.onResize = function (width, height) {

    this.emitter.position.setTo(0, 0);
    this.emitter.setSize(this.game.world.width * 1.1, 10);
};

Leaves.prototype.onUpdate = function () {
    this.emitter.forEachAlive(function (particle) {
        var interpolation = Phaser.Easing.Quadratic.Out(particle.lifespan / this.emitter.lifespan);
        particle.alpha = interpolation;
    }, this);
};

module.exports = Leaves;