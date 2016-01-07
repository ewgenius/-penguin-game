class PenguinGame {
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    preload() { }
    create() { }
}
window.onload = () => {
    var game = new PenguinGame();
};
