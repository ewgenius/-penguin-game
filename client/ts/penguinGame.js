"use strict";
var Player_1 = require('./Player');
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
        this.game.load.spritesheet('amputator', 'assets/amputator.png', 50, 50, 6);
    }
    create() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.time.desiredFps = 30;
        this.game.physics.arcade.gravity.y = 450;
        this.player = new Player_1.Player();
        this.player.sprite = this.game.add.sprite(300, 200, 'amputator');
        this.game.physics.enable(this.player.sprite, Phaser.Physics.ARCADE);
        this.player.sprite.body.bounce.y = 0.2;
        this.player.sprite.body.collideWorldBounds = true;
        this.player.sprite.body.setSize(20, 32, 5, 16);
        this.player.sprite.animations.add('left', [3, 4, 5, 4], 10, true);
        this.player.sprite.animations.add('right', [0, 1, 2, 1], 10, true);
        this.player.sprite.animations.add('turn', [0, 1, 2, 1], 10, true);
    }
    update() {
        this.player.update(this, this.cursors, this.jumpButton);
    }
    render() {
        this.game.debug.text(`${this.game.time.suggestedFps}`, 32, 32);
    }
}
exports.PenguinGame = PenguinGame;
