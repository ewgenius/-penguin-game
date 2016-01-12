import { config } from '../config';
import { Player } from '../entities/Player';
import { PenguinInput } from './Input';

export class PenguinGame {
  game: Phaser.Game;
  input: PenguinInput;
  player;

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

    this.game.load.tilemap('test1', 'assets/levels/test1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/sprites/tiles.png');
  }

  create() {
    this.input = new PenguinInput();
    this.input.create(this.game, config.input);


    var map = this.game.add.tilemap('test1');
    map.addTilesetImage('tiles', 'tiles');
    var layer = map.createLayer('world');
    layer.resizeWorld();

    map.setCollisionBetween(1, 12);

    this.game.physics.box2d.setBoundsToWorld(true, true, true, true, false);


    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.time.desiredFps = 30;
    this.game.physics.arcade.gravity.y = 980;

    this.player = new Player(this.game, 'amputator', [{
      name: 'walk',
      frames: [0, 1, 2, 1],
      framerate: 10,
      loop: true
    }]);
    this.game.physics.enable(this.player.sprite, Phaser.Physics.ARCADE);
    this.game.camera.follow(this.player.sprite);

    this.player.sprite.body.bounce.y = 0.2;
    this.player.sprite.body.collideWorldBounds = true;
    this.player.sprite.body.setSize(20, 32, 5, 16);

    var duck = this.game.add.sprite(300, 200, 'duck');
    duck.animations.add('quack', [0, 1], 8, true);
    duck.animations.add('crouch', [0, 2], 8, true);
    duck.play('quack');
  }

  update() {
    this.player.update(this, this.input);
  }

  render() {
    this.game.debug.text(`${this.game.time.suggestedFps}`, 32, 32);
  }
}
