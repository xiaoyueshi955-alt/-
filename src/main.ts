import './style.css';
import { GameScene } from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 1200,
  height: 900,
  backgroundColor: '#182236',
  scene: [GameScene]
};

new Phaser.Game(config);
