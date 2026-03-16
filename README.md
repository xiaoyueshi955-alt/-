# 猫咪识词挑战（Phaser 3 + TypeScript + Vite）

这是一个浏览器小游戏脚手架：

- 每局给出一个提示词（如：**乌云踏雪**）
- 屏幕显示 N 个猫咪手绘方格
- 玩家需要点中与提示词匹配的猫
- 选错一次可重试；第二次仍错误会高亮并放大正确手绘

## 玩法与难度

关卡难度由格子数 `N` 控制：

`4, 9, 16, 25, 36, 49, 64, 82, 100`

每局会从词库中抽取：

1. 一个提示词
2. 1 张匹配手绘
3. `N-1` 张其他手绘

## 项目结构

```text
.
├── index.html
├── package.json
├── public/
│   └── assets/
│       ├── audio/
│       ├── fonts/
│       └── images/
├── src/
│   ├── data/
│   │   └── catLexicon.ts
│   ├── scenes/
│   │   └── GameScene.ts
│   ├── types/
│   │   └── phaser-global.d.ts
│   ├── main.ts
│   └── style.css
├── tsconfig.json
└── vite.config.ts
```

## 快速开始

```bash
npm install
npm run dev
```

## 构建与预览

```bash
npm run build
npm run preview
```

## 资源目录说明

占位资源目录已创建，可直接放入上传素材：

- `public/assets/images`：猫咪手绘图
- `public/assets/audio`：音效 / 背景音乐
- `public/assets/fonts`：字体

> 当前示例中的猫咪图为代码动态生成的占位手绘风格，后续可替换为玩家上传素材。
