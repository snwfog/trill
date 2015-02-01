var factory = require('mods/factory.js');
var State = require('state/state.js');

var buttonSpacing = 20;

var TopMenu = function (game) {

    State.call(this, game);

    this.title = null;
    this.newButton = null;
    this.joinButton = null;
    this.helpButton = null;
    this.popup = null;
};

TopMenu.prototype = Object.create(State.prototype);

TopMenu.prototype.constructor = TopMenu;

TopMenu.prototype.onCreate = function () {

    this.title = factory.text.title.big(this.game, 'Trill');
    this.newButton = factory.button.blue(this.game, "New Game");
    this.joinButton = factory.button.yellow(this.game, "Join Game");
    this.helpButton = factory.button.grey.small(this.game, "?");
    this.popup = factory.popup(this.game, "This is some help text.");

    this.addMods([
        this.title,
        this.newButton,
        this.joinButton,
        this.helpButton,
        this.popup
    ]);
};

TopMenu.prototype.onPostCreate = function () {
    this.helpButton.object.onInputUp.add(function () {
        this.popup.show();
    }, this);
};

TopMenu.prototype.onRender = function () {
//  this.game.debug.spriteBounds(this.title);
//  this.game.debug.cameraInfo(this.game.camera, this.game.world.centerX - 200, this.game.world.centerY);
//  this.game.debug.geom(this.game.world.bounds, '#FF0000', false);
};

TopMenu.prototype.onResize = function (width, height) {

    this.title.group.position.setTo(width / 2, Math.max(0.25 * height, this.title.bounds.height / 2 + buttonSpacing));

    if (width > height) {
        this.newButton.group.position.setTo(width / 2 - this.newButton.bounds.width / 2 - buttonSpacing, 0.60 * height);
        this.joinButton.group.position.setTo(width / 2 + this.newButton.bounds.width / 2 + buttonSpacing, 0.60 * height);
    }
    else {
        this.newButton.group.position.setTo(width / 2, 0.65 * height - this.newButton.bounds.height / 2 - buttonSpacing);
        this.joinButton.group.position.setTo(width / 2, 0.65 * height + this.newButton.bounds.height / 2 + buttonSpacing);
    }
    this.helpButton.group.position.setTo(width / 2, (height + this.joinButton.bounds.bottom) / 2);

    this.popup.group.position.setTo(width / 2, height / 2);
};

module.exports = TopMenu;