"use strict";
class Player {
    constructor(game, key, animations) {
        this.facing = 'left';
        this.speed = 300;
        this.jumpSpeed = 500;
        this.jumpTimer = 0;
        this.key = key;
        this.sprite = game.add.sprite(0, 0, key);
        if (animations)
            animations.map(animation => this.sprite.animations.add(animation.name, animation.frames, animation.framerate, animation.loop));
    }
    update(game, input) {
        this.sprite.body.velocity.x = 0;
        if (input.cursors.left.isDown) {
            this.sprite.body.velocity.x = -this.speed;
            if (this.facing != 'left') {
                this.sprite.animations.play('left');
                this.facing = 'left';
            }
        }
        else if (input.cursors.right.isDown) {
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
        if (input.buttonJump.isDown && this.sprite.body.onFloor() && game.time.now > this.jumpTimer) {
            this.sprite.body.velocity.y = -this.jumpSpeed;
            this.jumpTimer = game.time.now + 750;
        }
    }
}
exports.Player = Player;
