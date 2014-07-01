/*
 This is a simple state template to use for getting a Phaser game up
 and running quickly. Simply add your own game logic to the default
 state object or delete it and make your own.
 */
var game, state;

state = {
    init: function() {
        var style, t, text;
        text = "Phaser Version " + Phaser.VERSION + " works! Nice !";
        style = {
            font: "24px Arial",
            fill: "#fff",
            align: "center"
        };
        t = game.add.text(this.world.centerX, this.world.centerY, text, style);
        t.anchor.setTo(0.5, 0.5);
    },
    preload: function() {},
    create: function() {},
    update: function() {}
};

game = new Phaser.Game(800, 480, Phaser.AUTO, '', state, false, false);
game['webapi'] = new WebApi({
    url: 'http://localhost:8080/'
});