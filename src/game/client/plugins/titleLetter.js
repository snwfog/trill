var Letter = function(game, parent, group){

  return {

    prototype: new Phaser.Plugin(game, parent),

    /** the max amount by which the letter will move */
    moveAmount: new Phaser.Point(5, 2),

    /** the speed at which the letter will "shake" (in ms) */
    frequency: 100,

    originalPosition: new Phaser.Point(group.position.x, group.position.y),

    lastMoveTimeStamp: 0,

    init: function(){

    },

    update: function(){
      if (game.time.now - this.lastMoveTimeStamp > this.frequency){
        group.position.setTo(
                this.originalPosition.x + this.moveAmount.x * (Math.random() - 0.5),
                this.originalPosition.y + this.moveAmount.y * (Math.random() - 0.5)
        );
        this.lastMoveTimeStamp = game.time.now;
      }
    }
  };
};

module.exports = Letter;