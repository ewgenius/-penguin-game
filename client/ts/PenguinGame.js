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
        this.game.load.spritesheet('amputator', 'assets/sprites/amputator.png', 50, 50, 6);
        this.game.load.spritesheet('duck', 'assets/sprites/duck.png', 42, 120, 3);
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
        var duck = this.game.add.sprite(300, 200, 'duck');
        duck.animations.add('quack', [0, 1], 8, true);
        duck.animations.add('crouch', [0, 2], 8, true);
        duck.play('quack');
    }
    update() {
        this.player.update(this, this.cursors, this.jumpButton);
    }
    render() {
        this.game.debug.text(`${this.game.time.suggestedFps}`, 32, 32);
    }
}
exports.PenguinGame = PenguinGame;
