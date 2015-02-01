var factory = require('modFactory.js');
var State = require('state/state.js');
var MenuManager = require('menus/manager.js');

var buttonSpacing = 20;

var MenuState = function (game) {

  State.call(this, game);

  this.leaves = null;
  this.manager = null;
};

MenuState.prototype = Object.create(State.prototype);

MenuState.prototype.constructor = MenuState;

MenuState.prototype.onCreate = function () {

  this.leaves = factory.leaves(this.game);
  this.manager = new MenuManager(this.game);

  this.addMods([
    this.leaves,
    this.manager
  ]);
};

MenuState.prototype.onPostCreate = function () {

};

MenuState.prototype.onResize = function (width, height) {

  this.leaves.group.position.setTo(width / 2, -32);
  this.manager.group.position.setTo(0, 0);
};

module.exports = MenuState;