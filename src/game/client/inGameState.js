var InGameState = function () {

  this.intervalId = null;

  this.numOfTouches = 0;
  this.currentTouchVelocity = 0;

  this.opponentCurrentVelocity = 0;

  return {

    prototype: new Phaser.State(),

    preload: function () {

      this.game.load.image('hand', 'static/imgs/hand.png');
      this.game.load.image('rope_knot', 'static/imgs/rope_knot.png');
      this.game.load.image('rope_part', 'static/imgs/rope_middle.png');
    },

    create: function () {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // Create the rope
      var rope = this.game.add.group();
      rope.enableBody = true;
      rope.physicsBodyType = Phaser.Physics.ARCADE;

      rope.position.x = this.game.width / 2;
      rope.position.y = this.game.height / 2;

      // First add the knot at the center of the screen
      var knot = rope.create(0, 0, 'rope_knot');
      knot.anchor.setTo(0.5, 0.5);

      // Then add rope parts that extend from the knot to the top and
      // bottom of the screen
      var ropeHeight = this.game.height / 2;
      var ropePartImg = this.game.cache.getImage('rope_part');

      var ropeTop = this.game.add.tileSprite(0, 0, ropePartImg.width, ropeHeight, 'rope_part');
      rope.addChild(ropeTop);
      this.game.physics.enable(ropeTop, Phaser.Physics.ARCADE);
      ropeTop.enableBody = true;
      ropeTop.anchor.setTo(0.5, 1);
      ropeTop.position.setTo(knot.x, knot.y - knot.height / 2);

      var ropeBottom = this.game.add.tileSprite(0, 0, ropePartImg.width, ropeHeight, 'rope_part');
      rope.addChild(ropeBottom);
      this.game.physics.enable(ropeBottom, Phaser.Physics.ARCADE);
      ropeBottom.enableBody = true;
      ropeBottom.anchor.setTo(0.5, 0);
      ropeBottom.position.setTo(knot.x, knot.y + knot.height / 2);

      // Create top hand
      var topHand = this.game.add.sprite(0, 0, 'hand');
      topHand.anchor.setTo(0.34, 0.5);
      topHand.scale.x = -1;

      // Display hand at top middle of the stage
      topHand.position.x = this.game.width / 2;
      topHand.position.y = topHand.height / 2;

      // Create bottom hand
      var bottomHand = this.game.add.sprite(0, 0, 'hand');
      bottomHand.anchor.setTo(0.34, 0.5);

      // Display hand at bottom middle of the stage
      bottomHand.position.x = this.game.width / 2;
      bottomHand.position.y = this.game.height - bottomHand.height / 2;

      rope.scale.setTo(2.1, 2.1);


      // Let's animate all that.
      this.game.add.tween(topHand.scale).to({x: -1.05, y: 1.05}, 5000, Phaser.Easing.Bounce.InOut, true, 1000 * Math.random(), Number.MAX_VALUE, true);
      this.game.add.tween(bottomHand.scale).to({x: 1.05, y: 1.05}, 5000, Phaser.Easing.Bounce.InOut, true, 1000 * Math.random(), Number.MAX_VALUE, true);
      this.game.add.tween(rope.scale).to({x: rope.scale.x + 0.05, y: rope.scale.y + 0.05}, 7500, Phaser.Easing.Bounce.InOut, true, 1000 * Math.random(), Number.MAX_VALUE, true);

      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
      this.game.scale.startFullScreen();

      // Register server callbacks.
      var state = this;
      state.game.webapi
        .on('connected', function () {
          state.game.webapi.createGame();
        })

        .on('otherPlayerConnectionLost', function () {
          console.log('hey ! the other guy quit !');
        })

        .on('disconnected', function () {
          console.log('hey ! it is disconnected!');
        })

        .on('gameReady', function () {
          console.log('hey ! game is ready !');
          state.game.webapi.sendPlayerReady();
        })

        .on('gameEnded', function () {
          clearInterval(state.intervalId);
          console.log('hey ! game is ended !');
        })

        .on('packetReceived', function (packet) {

          state.opponentCurrentVelocity = packet;
          console.log(packet);
        })

        .on('gameCountDownStart', function (millis) {
          console.log('hey ! game starts in ' + millis + ' millis !');
          setTimeout(function () {
            state.intervalId = setInterval(function () {

              state.currentTouchVelocity = state.numOfTouches / 50;
              console.log("your velocity is " + state.currentTouchVelocity);
              console.log(state.currentTouchVelocity);
              rope.setAll('body.velocity.y', state.opponentCurrentVelocity * 30 - state.currentTouchVelocity * 1.5 * 1000);
              state.game.webapi.sendPacket(state.currentTouchVelocity);

              state.numOfTouches = 0;
            }, 50);
          }, millis);

          state.game.input.onTap.add(function () {

            console.log("hey ! you are tapping !");
            state.numOfTouches++;
          });

        });

      this.game.webapi.connect();
    }
  };
}


module.exports = InGameState;