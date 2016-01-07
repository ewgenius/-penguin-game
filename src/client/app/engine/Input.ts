export class PenguinInput {
  cursors: Phaser.CursorKeys;
  buttonJump: Phaser.Key;
  buttonQuack: Phaser.Key;
  buttonAttack: Phaser.Key;

  create(game: Phaser.Game, config?) {
    this.cursors = game.input.keyboard.createCursorKeys();
    this.buttonJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.buttonQuack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.buttonAttack = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }
}
