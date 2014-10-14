var FadeOut = function (source, dest) {

  var tween = source.add.tween(source.group).to({alpha: 0}, 500, Phaser.Easing.Cubic.InOut);
  tween.onComplete.add(function () {
    source.game.state.start(dest);
  });
  return tween;
};

module.exports = FadeOut;