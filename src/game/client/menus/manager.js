var mods = require('mods/factory.js');
var menus = require('menus/factory.js');
var State = require('state/state.js');

var MenuManager = function (game) {

    State.call(this, game);

    this.currentMenu = null;

    var manager = this;
    this.onPostCreateTopMenu = function (menu) {
        menu.newButton.object.onInputUp.add(function () {
            manager.switchToCreateMenu();
        });

        menu.joinButton.object.onInputUp.add(function () {
            manager.switchToJoinMenu();
        });
    };
};

MenuManager.prototype = Object.create(State.prototype);

MenuManager.prototype.constructor = MenuManager;

MenuManager.prototype.onCreate = function () {

    var startMenu = new menus.top(this.game);
    this.addMod(startMenu);
    mods.tween.fadeIn(startMenu).start();
    this.currentMenu = startMenu;
};

MenuManager.prototype.onPostCreate = function () {
    this.onPostCreateTopMenu(this.currentMenu);
};

MenuManager.prototype.onResize = function (width, height) {
    this.currentMenu.group.position.setTo(0, 0);
};

MenuManager.prototype.switchToMenu = function (newMenu, onCompleteCallback, context) {
    var fadeOut = mods.tween.fadeOut(this);

    fadeOut.onComplete.add(function () {
        this.group.alpha = 1;
        this.removeMod(this.currentMenu);
        this.addMod(newMenu, undefined, true);
        mods.tween.fadeIn(newMenu).start();

        this.currentMenu = newMenu;

        if (onCompleteCallback !== undefined) {
            onCompleteCallback(newMenu);
        }
    }, this);

    fadeOut.start();
};

MenuManager.prototype.switchToTopMenu = function () {
    this.switchToMenu(new menus.top(this.game), this.onPostCreateTopMenu);
};

MenuManager.prototype.switchToCreateMenu = function () {
    var manager = this;
    this.switchToMenu(new menus.create(this.game), function (menu) {
        menu.backButton.object.onInputUp.add(function () {
            manager.switchToTopMenu();
        });
    });
};

MenuManager.prototype.switchToJoinMenu = function () {
    var manager = this;
    this.switchToMenu(new menus.join(this.game), function (menu) {
        menu.backButton.object.onInputUp.add(function () {
            manager.switchToTopMenu();
        });
    });
};

module.exports = MenuManager;