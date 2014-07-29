/** Average clicking speed, in numOfClicks/millisecs */
var averageSpeed = 62 / (10 * 1000);

var InGameState = function () {

  return {

    intervalId : null,

    numOfTouches : 0,

    currentTouchVelocity : 0,

    opponentCurrentVelocity : 0,

    prototype: new Phaser.State(),

    rope:null,

    knot:null,

    preload: function () {

      this.game.load.image('rope_knot', 'static/img/rope_knot.png');
      this.game.load.image('rope_part', 'static/img/rope_middle.png');
    },

    create: function () {

      // Max speed the rope can go to in either direction, in pixel/secs
      this.maxSpeed = 0.2 * this.game.height;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // Create the rope
      this.rope = this.game.add.group();
      this.rope.enableBody = true;
      this.rope.physicsBodyType = Phaser.Physics.ARCADE;

      this.rope.position.x = this.game.width / 2;
      this.rope.position.y = this.game.height / 2;

      // First add the knot at the center of the screen
      this.knot = this.rope.create(0, 0, 'rope_knot');
      this.knot.anchor.setTo(0.5, 0.5);
      this.knot.body.collideWorldBounds = true;
      this.knot.body.bounce = 0.5;

      // Then add rope parts that extend from the knot to the top and
      // bottom of the screen
      var ropeHeight = this.game.height / 2;
      var ropePartImg = this.game.cache.getImage('rope_part');

      var ropeTop = this.game.add.tileSprite(0, 0, ropePartImg.width, ropeHeight, 'rope_part');
      this.rope.addChild(ropeTop);
      this.game.physics.enable(ropeTop, Phaser.Physics.ARCADE);
      ropeTop.enableBody = true;
      ropeTop.anchor.setTo(0.5, 1);
      ropeTop.position.setTo(this.knot.x, this.knot.y - this.knot.height / 2);

      var ropeBottom = this.game.add.tileSprite(0, 0, ropePartImg.width, ropeHeight, 'rope_part');
      this.rope.addChild(ropeBottom);
      this.game.physics.enable(ropeBottom, Phaser.Physics.ARCADE);
      ropeBottom.enableBody = true;
      ropeBottom.anchor.setTo(0.5, 0);
      ropeBottom.position.setTo(this.knot.x, this.knot.y + this.knot.height / 2);

      this.rope.scale.setTo(2.1, 2.1);

      // Let's animate all that.
      this.game.add.tween(this.rope.scale).to({x: this.rope.scale.x + 0.1, y: this.rope.scale.y + 0.1}, 7500, Phaser.Easing.Bounce.InOut, true, 1000 * Math.random(), Number.MAX_VALUE, true);

      // Register server callbacks.
      var state = this;
      this.game.webapi
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
            state.rope.setAll('body.acceleration.y', 0);
            state.rope.setAll('body.velocity.y', 0);
            console.log('hey ! game is ended !');

          })

          .on('packetReceived', function (packet) {

            state.opponentCurrentVelocity = packet;
          })

          .on('gameCountDownStart', function (millis) {
            console.log('hey ! game starts in ' + millis + ' millis !');
            state.playCountDown();

            state.rope.setAll('body.drag.y', 0.1 * state.game.height);
            setTimeout(function () {
              state.intervalId = setInterval(function () {

                state.currentTouchVelocity = state.numOfTouches / 50;

                state.rope.setAll('body.acceleration.y', (state.opponentCurrentVelocity - state.currentTouchVelocity) * 1000 * 0.20 * state.game.height);
                state.game.webapi.sendPacket(state.currentTouchVelocity);

                state.numOfTouches = 0;
              }, 50);
            }, millis);

            state.game.input.onTap.add(function () {
              state.numOfTouches++;
            });

          }).connect();
    },

    update:function(){
      if (this.rope !== undefined){
        this.rope.setAll('body.velocity.y', Phaser.Math.clamp(this.knot.body.velocity.y, -this.maxSpeed, this.maxSpeed));
      }
    },

    /**
     * Plays the countdown text animation
     */
    playCountDown: function () {

      var txtStyle = {font: 'Inversionz', fill: "#FFFFFF"};

      var countDownTxt = this.game.add.text(0, 0, '3', txtStyle);
      countDownTxt.anchor.setTo(0.5, 0.5);
      countDownTxt.position.setTo(this.game.world.centerX, this.game.world.centerY);
      countDownTxt.fontSize = 65;

      var state = this;
      this.game.add.tween(countDownTxt)
          .to({fontSize: 25}, 1000, Phaser.Easing.Exponential.In, true)
          .onComplete.add(function () {

            countDownTxt.text = '2';
            countDownTxt.fontSize = 65;
            state.game.add.tween(countDownTxt)
                .to({fontSize: 25}, 1000, Phaser.Easing.Exponential.In, true)
                .onComplete.add(function () {

                  countDownTxt.text = '1';
                  countDownTxt.fontSize = 65;
                  state.game.add.tween(countDownTxt)
                      .to({fontSize: 25}, 1000, Phaser.Easing.Exponential.In, true)
                      .onComplete.add(function () {
                        countDownTxt.text = '';
                      });
                });
          });
    }

  };
}

module.exports = InGameState;