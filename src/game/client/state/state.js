var State = function (game) {

  Phaser.State.call(this);

  if (game !== undefined) {
    this.game = game;
    this.add = game.add;
    this.make = game.make;
    this.camera = game.camera;
    this.cache = game.cache;
    this.input = game.input;
    this.load = game.load;
    this.math = game.math;
    this.sound = game.sound;
    this.scale = game.scale;
    this.state = this;
    this.stage = game.stage;
    this.time = game.time;
    this.tweens = game.tweens;
    this.world = game.world;
    this.particles = game.particles;
    this.rnd = game.rnd;
    this.physics = game.physics;
  }

  this.mods = [];
  this.bounds = {};
  this.group = null;

  var state = this;
  Object.defineProperties(this.bounds,
      {
        width: {
          value: 0,
          configurable: true
        },

        height: {
          value: 0,
          configurable: true
        },

        top: {
          get: function () {
            var point = state.group != null ? state.group.position : {x: 0, y: 0};
            return point.y - this.height / 2;
          }
        },

        bottom: {
          get: function () {
            var point = state.group != null ? state.group.position : {x: 0, y: 0};
            return point.y + this.height / 2;
          }
        },

        left: {
          get: function () {
            var point = state.group != null ? state.group.position : {x: 0, y: 0};
            return point.x - this.width / 2;
          }
        },

        right: {
          get: function () {
            var point = state.group != null ? state.group.position : {x: 0, y: 0};
            return point.x + this.width / 2;
          }
        }

      });
};

State.prototype = Object.create(Phaser.State.prototype);

State.prototype.constructor = State;

State.prototype.addMods = function (mods) {
  for (var i in mods) {
    this.addMod(mods[i]);
  }
};

State.prototype.addMod = function (mod) {

  mod.group = this.add.group(this.group);
  this.mods.push(mod);
};

/**
 * Called only if the state is a root state
 */
State.prototype.init = function () {
  this.group = this.world;
}

State.prototype.preload = function () {

  this.callEvent('onPreload');

  for (var i in this.mods) {
    this.mods[i].preload();
  }
};

State.prototype.loadUpdate = function () {

  this.callEvent('onLoadUpdate');

  for (var i in this.mods) {
    this.mods[i].loadUpdate();
  }
};

State.prototype.loadRender = function () {

  this.callEvent('onLoadRender');

  for (var i in this.mods) {
    this.mods[i].loadRender();
  }
};

State.prototype.create = function () {

  this.callEvent('onCreate');

  for (var i in this.mods) {
    this.mods[i].create();
  }

  this.resize(this.game.width, this.game.height);
};

State.prototype.update = function () {

  this.callEvent('onUpdate');

  for (var i in this.mods) {
    this.mods[i].update();
  }
};

State.prototype.render = function () {

  this.callEvent('onRender');

  for (var i in this.mods) {
    this.mods[i].render();
  }
};

State.prototype.resize = function (width, height) {

  this.callEvent('onResize', width, height);

  for (var i in this.mods) {
    this.mods[i].resize();
  }
};

State.prototype.paused = function () {

  this.callEvent('onPaused');

  for (var i in this.mods) {
    this.mods[i].paused();
  }
};

State.prototype.pauseUpdate = function () {

  this.callEvent('onPauseUpdate');

  for (var i in this.mods) {
    this.mods[i].pauseUpdate();
  }
};

State.prototype.shutdown = function () {

  this.callEvent('onShutdown');

  for (var i in this.mods) {
    this.mods[i].shutdown();
  }
};

State.prototype.callEvent = function (eventName, arg1, arg2) {

  if (this[eventName] !== undefined) {

    // explicitly passing the arguments is more efficient than using
    // a call() or apply();
    this[eventName](arg1, arg2);
  }
};

State.prototype.bounds = {};

module.exports = State;