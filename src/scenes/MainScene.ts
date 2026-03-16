import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Arc;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private speed = 220;

  constructor() {
    super('MainScene');
  }

  create(): void {
    this.add
      .text(16, 16, 'Move the orb with arrow keys', {
        color: '#ffffff',
        fontSize: '24px',
        fontFamily: 'Arial, sans-serif'
      })
      .setDepth(2);

    this.player = this.add.circle(400, 300, 20, 0x56e39f);

    this.add
      .rectangle(400, 590, 800, 20, 0x0d0f1a)
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.tweens.add({
      targets: this.player,
      alpha: 0.5,
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  update(time: number, delta: number): void {
    const movement = (this.speed * delta) / 1000;

    if (this.cursors.left?.isDown) {
      this.player.x -= movement;
    } else if (this.cursors.right?.isDown) {
      this.player.x += movement;
    }

    if (this.cursors.up?.isDown) {
      this.player.y -= movement;
    } else if (this.cursors.down?.isDown) {
      this.player.y += movement;
    }

    this.player.x = Phaser.Math.Clamp(this.player.x, 20, 780);
    this.player.y = Phaser.Math.Clamp(this.player.y, 40, 580);

    const hue = ((time / 20) % 360) / 360;
    const color = Phaser.Display.Color.HSLToColor(hue, 0.8, 0.6).color;
    this.player.setFillStyle(color);
  }
}
