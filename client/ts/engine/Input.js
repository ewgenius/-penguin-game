"use strict";
class PenguinInput {
    create(game, config) {
        this.cursors = game.input.keyboard.createCursorKeys();
        this.buttonJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.buttonQuack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.buttonAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
}
exports.PenguinInput = PenguinInput;
