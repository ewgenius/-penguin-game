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
                    this.sprite.frame = 0;
                }
                else {
                    this.sprite.frame = 5;
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
class PenguinGame {
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'main', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }
    preload() {
        this.game.load.spritesheet('amputator', 'assets/amputator.png', 50, 50, 4);
    }
    create() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.time.desiredFps = 30;
        this.game.physics.arcade.gravity.y = 450;
        this.player = new Player();
        this.player.sprite = this.game.add.sprite(300, 200, 'amputator');
        this.game.physics.enable(this.player.sprite, Phaser.Physics.ARCADE);
        this.player.sprite.body.bounce.y = 0.2;
        this.player.sprite.body.collideWorldBounds = true;
        this.player.sprite.body.setSize(20, 32, 5, 16);
        this.player.sprite.animations.add('left', [0, 1, 2, 1]);
        this.player.sprite.animations.add('right', [0, 1, 2, 1]);
        this.player.sprite.animations.add('turn', [0, 1, 2, 1]);
        this.player.sprite.animations.play('left', 8, true);
    }
    update() {
        this.player.update(this, this.cursors, this.jumpButton);
    }
    render() {
        this.game.debug.text(`${this.game.time.suggestedFps}`, 32, 32);
    }
}
exports.PenguinGame = PenguinGame;
