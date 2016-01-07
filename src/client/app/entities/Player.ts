import { config } from '../config';
import { Animation } from '../engine/Animation';
import { PenguinInput } from '../engine/Input';

export class Player {
  sprite: Phaser.Sprite;
  key: string;
  facing = 'left';
  speed = 200;
  jumpTimer = 0;

  constructor(game: Phaser.Game, key: string, animations?: Animation[]) {
    this.key = key;

    this.sprite = game.add.sprite(0, 0, key);
    if (animations)
      animations.map(animation => this.sprite.animations.add(
        animation.name,
        animation.frames,
        animation.framerate,
        animation.loop));
  }

  update(game: Phaser.Game, input: PenguinInput) {
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
      this.sprite.body.velocity.y = -this.speed;
      this.jumpTimer = game.time.now + 750;
    }
  }
}
