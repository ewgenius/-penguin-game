"use strict";
class Player {
    constructor() {
        this.facing = 'left';
        this.speed = 200;
        this.jumpTimer = 0;
    }
    update(game, cursors, jumpButton) {
        this.sprite.body.velocity.x = 0;
        if (cursors.left.isDown) {
            this.sprite.body.velocity.x = -this.speed;
            if (this.facing != 'left') {
                this.sprite.animations.play('left');
                this.facing = 'left';
            }
        }
        else if (cursors.right.isDown) {
            this.sprite.body.velocity.x = this.speed;
            if (this.facing != 'right') {
                this.sprite.animations.play('right');
                this.facing = 'right';
            }
        }
        else {
            if (this.facing != 'idle') {
                this.sprite.animations.stop();
                if (this.facing == 'left') {
                    this.sprite.frame = 3;
                }
                else {
                    this.sprite.frame = 0;
                }
                this.facing = 'idle';
            }
        }
        if (jumpButton.isDown && this.sprite.body.onFloor() && game.time.now > this.jumpTimer) {
            this.sprite.body.velocity.y = -this.speed;
            this.jumpTimer = game.time.now + 750;
        }
    }
}
exports.Player = Player;
