var FadeIn = function (state, from) {

    var tween = state.game.add.tween(state.group);
    console.log(state.group.alpha > 0);
    return state.group.alpha > 0 ? tween.from({alpha: 0}, 500, Phaser.Easing.Cubic.InOut) : tween.to({alpha: 1}, 500, Phaser.Easing.Cubic.InOut);
};

module.exports = FadeIn;