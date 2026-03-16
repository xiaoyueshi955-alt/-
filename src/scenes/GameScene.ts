import { LEVEL_SIZES, PROMPTS, type CatStyle, type PromptEntry } from '../data/catLexicon';

interface CellChoice {
  style: CatStyle;
  isCorrect: boolean;
}

export class GameScene extends Phaser.Scene {
  private levelIndex = 0;
  private currentPrompt!: PromptEntry;
  private wrongAttempts = 0;
  private locked = false;
  private correctCell?: any;
  private readonly texturesReady = new Set<CatStyle>();

  constructor() {
    super('GameScene');
  }

  create(): void {
    this.createCatTextures();
    this.startRound();
  }

  private createCatTextures(): void {
    const styles: CatStyle[] = ['cloud-step-snow', 'orange-tabby', 'cow-cat', 'black-panther', 'calico', 'ragdoll'];
    styles.forEach((style) => {
      if (this.texturesReady.has(style)) return;
      const g = this.add.graphics();

      g.fillStyle(0xffffff, 1);
      g.fillRoundedRect(0, 0, 180, 180, 24);
      g.lineStyle(4, 0x2a2a2a, 1);
      g.strokeRoundedRect(0, 0, 180, 180, 24);

      const palette = this.getPalette(style);
      g.fillStyle(palette.main, 1);
      g.fillCircle(90, 100, 55);
      g.fillTriangle(45, 66, 62, 30, 82, 70);
      g.fillTriangle(98, 70, 118, 30, 136, 66);

      g.fillStyle(palette.patch, 1);
      g.fillCircle(72, 100, 20);
      g.fillCircle(104, 112, 18);

      g.lineStyle(5, 0x1e1e1e, 1);
      g.strokeCircle(70, 95, 8);
      g.strokeCircle(108, 95, 8);
      g.beginPath();
      g.moveTo(85, 120);
      g.lineTo(95, 120);
      g.lineTo(90, 128);
      g.closePath();
      g.strokePath();
      g.lineBetween(90, 128, 90, 138);
      g.lineBetween(90, 138, 78, 146);
      g.lineBetween(90, 138, 102, 146);

      g.lineStyle(2, 0x333333, 0.8);
      g.lineBetween(24, 118, 70, 122);
      g.lineBetween(24, 128, 70, 128);
      g.lineBetween(110, 122, 156, 118);
      g.lineBetween(110, 128, 156, 128);

      g.generateTexture(`cat-${style}`, 180, 180);
      g.destroy();
      this.texturesReady.add(style);
    });
  }

  private getPalette(style: CatStyle): { main: number; patch: number } {
    switch (style) {
      case 'cloud-step-snow':
        return { main: 0x202020, patch: 0xf5f5f5 };
      case 'orange-tabby':
        return { main: 0xf7a64a, patch: 0xffe0bb };
      case 'cow-cat':
        return { main: 0xffffff, patch: 0x161616 };
      case 'black-panther':
        return { main: 0x111111, patch: 0x333333 };
      case 'calico':
        return { main: 0xfff8e8, patch: 0xe78647 };
      case 'ragdoll':
        return { main: 0xe5e1f8, patch: 0x8d7dbf };
      default:
        return { main: 0xffffff, patch: 0x555555 };
    }
  }

  private startRound(): void {
    this.children.removeAll();
    this.wrongAttempts = 0;
    this.locked = false;
    this.correctCell = undefined;

    const levelSize = LEVEL_SIZES[this.levelIndex];
    this.currentPrompt = Phaser.Utils.Array.GetRandom(PROMPTS);

    this.add.text(24, 20, `第 ${this.levelIndex + 1} 关 / ${LEVEL_SIZES.length} 关`, {
      fontSize: '24px',
      color: '#f5f5f5'
    });

    this.add.text(24, 56, `提示词：${this.currentPrompt.term}`, {
      fontSize: '34px',
      color: '#ffe083',
      fontStyle: 'bold'
    });

    this.add.text(24, 98, '规则：选错一次可重试，第二次选错将显示正确答案。', {
      fontSize: '20px',
      color: '#d7dcff'
    });

    const pool = PROMPTS.map((entry) => entry.style);
    const choices: CellChoice[] = [{ style: this.currentPrompt.style, isCorrect: true }];

    while (choices.length < levelSize) {
      const style = Phaser.Utils.Array.GetRandom(pool);
      if (choices.length < pool.length || style !== this.currentPrompt.style) {
        choices.push({ style, isCorrect: false });
      }
    }

    Phaser.Utils.Array.Shuffle(choices);

    const top = 150;
    const availableWidth = this.scale.width - 40;
    const availableHeight = this.scale.height - top - 20;
    const cols = Math.ceil(Math.sqrt(levelSize));
    const rows = Math.ceil(levelSize / cols);
    const cellSize = Math.min(Math.floor(availableWidth / cols), Math.floor(availableHeight / rows));

    choices.forEach((choice, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = 20 + col * cellSize;
      const y = top + row * cellSize;
      this.createCell(x, y, cellSize, choice);
    });
  }

  private createCell(x: number, y: number, size: number, choice: CellChoice): void {
    const bg = this.add.rectangle(x + size / 2, y + size / 2, size - 6, size - 6, 0xffffff, 0.95);
    bg.setStrokeStyle(2, 0x8f8f8f);

    const imageSize = Math.max(26, size - 24);
    const cat = this.add.image(x + size / 2, y + size / 2, `cat-${choice.style}`);
    cat.setDisplaySize(imageSize, imageSize);

    bg.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      if (this.locked) return;

      if (choice.isCorrect) {
        bg.setStrokeStyle(5, 0x34c759);
        this.showStatus('✅ 回答正确！准备进入下一关', 0x79ff9f);
        this.locked = true;
        this.time.delayedCall(1200, () => this.advanceLevel());
      } else {
        this.wrongAttempts += 1;
        bg.setStrokeStyle(5, 0xff5b5b);
        if (this.wrongAttempts === 1) {
          this.showStatus('❌ 不对哦，再试一次！', 0xffd166);
        } else {
          this.locked = true;
          this.showStatus('❌ 第二次仍错误，以下是正确答案：', 0xff8fab);
          this.revealAnswer();
        }
      }
    });

    if (choice.isCorrect) {
      this.correctCell = cat;
    }
  }

  private revealAnswer(): void {
    if (!this.correctCell) return;

    const clone = this.add.image(this.scale.width / 2, this.scale.height / 2 + 10, this.correctCell.texture.key);
    clone.setDisplaySize(260, 260);
    clone.setDepth(8);

    const shade = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 0x000000, 0.45);
    shade.setDepth(7);
    clone.setDepth(9);

    this.time.delayedCall(1800, () => {
      shade.destroy();
      clone.destroy();
      this.advanceLevel();
    });
  }

  private advanceLevel(): void {
    this.levelIndex = (this.levelIndex + 1) % LEVEL_SIZES.length;
    this.startRound();
  }

  private showStatus(message: string, color: number): void {
    const prev = this.children.getByName('status');
    if (prev) prev.destroy();

    const status = this.add.text(this.scale.width - 24, 24, message, {
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: Phaser.Display.Color.IntegerToColor(color).rgba,
      padding: { x: 14, y: 8 }
    });
    status.setOrigin(1, 0);
    status.setDepth(20);
    status.setName('status');
  }
}
