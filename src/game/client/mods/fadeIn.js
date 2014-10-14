var FadeIn = function (state) {

  return state.game.add.tween(state.group).from({alpha: 0}, 500, Phaser.Easing.Cubic.InOut);
};

module.exports = FadeIn;