// ゲーム定数
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const PATTERN_SIZE = 5;

// ブロックの色（開発者テーマ）
const COLORS = {
  0: "#252526", // 空
  1: "#f48771", // バグ赤
  2: "#4ec9b0", // 関数シアン
  3: "#ce9178", // 文字列オレンジ
  4: "#c586c0", // クラスパープル
  5: "#dcdcaa", // 変数イエロー
  6: "#569cd6", // キーワードブルー
  7: "#b5cea8", // 数値グリーン
  8: "#000000", // ボイド（黒）
};

// テトロミノの形状（パターンマッチしやすいよう簡略化）
const SHAPES = [
  [[1]], // 単一ブロック
  [[2, 2]], // 横並びペア
  [[3], [3]], // 縦並びペア
  [
    [4, 4],
    [4, 4],
  ], // 2x2 四角
  [[5, 5, 5]], // 横3連ライン
  [[8]], // ボイドブロック（黒）
  [[8, 8]], // ボイドペア
];

// ゲームの状態
let canvas, ctx, patternCanvas, patternCtx;
let board = [];
let currentPiece = null;
let currentX = 0;
let currentY = 0;
let score = 0;
let gameOver = false;
let isPaused = false;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let targetPattern = null;

// ゲームの初期化
function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  patternCanvas = document.getElementById("patternCanvas");
  patternCtx = patternCanvas.getContext("2d");

  // 空のボードを初期化
  board = Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(0));

  // 初期ターゲットパターンを設定
  setNewTargetPattern();

  // 最初のピースを生成
  spawnPiece();

  // ゲームループを開始
  requestAnimationFrame(gameLoop);

  // キーボード操作を追加
  document.addEventListener("keydown", handleKeyPress);
}

// ゲームループ
function gameLoop(time = 0) {
  if (!gameOver && !isPaused) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
      moveDown();
      dropCounter = 0;
    }
  }

  draw();
  requestAnimationFrame(gameLoop);
}

// 全体を描画
function draw() {
  // キャンバスをクリア
  ctx.fillStyle = COLORS[0];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ボードを描画
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col]) {
        drawBlock(ctx, col, row, board[row][col]);
      }
    }
  }

  // 現在のピースを描画
  if (currentPiece) {
    drawPiece(ctx, currentPiece, currentX, currentY);
  }

  // グリッドを描画
  ctx.strokeStyle = "#3e3e42";
  ctx.lineWidth = 0.5;
  for (let row = 0; row <= ROWS; row++) {
    ctx.beginPath();
    ctx.moveTo(0, row * BLOCK_SIZE);
    ctx.lineTo(COLS * BLOCK_SIZE, row * BLOCK_SIZE);
    ctx.stroke();
  }
  for (let col = 0; col <= COLS; col++) {
    ctx.beginPath();
    ctx.moveTo(col * BLOCK_SIZE, 0);
    ctx.lineTo(col * BLOCK_SIZE, ROWS * BLOCK_SIZE);
    ctx.stroke();
  }
}

// 単一ブロックを描画
function drawBlock(context, x, y, colorCode) {
  context.fillStyle = COLORS[colorCode];
  context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  context.strokeStyle = "#1e1e1e";
  context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

// 現在のピースを描画
function drawPiece(context, piece, offsetX, offsetY) {
  for (let row = 0; row < piece.length; row++) {
    for (let col = 0; col < piece[row].length; col++) {
      if (piece[row][col]) {
        drawBlock(context, offsetX + col, offsetY + row, piece[row][col]);
      }
    }
  }
}

// 新しいピースを生成
function spawnPiece() {
  const randomShape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  currentPiece = randomShape.map((row) => [...row]);
  currentX = Math.floor(COLS / 2) - Math.floor(currentPiece[0].length / 2);
  currentY = 0;

  if (checkCollision(currentPiece, currentX, currentY)) {
    endGame();
  }
}

// 衝突判定
function checkCollision(piece, x, y) {
  for (let row = 0; row < piece.length; row++) {
    for (let col = 0; col < piece[row].length; col++) {
      if (piece[row][col]) {
        const newX = x + col;
        const newY = y + row;

        if (newX < 0 || newX >= COLS || newY >= ROWS) {
          return true;
        }

        if (newY >= 0 && board[newY][newX]) {
          return true;
        }
      }
    }
  }
  return false;
}

// ピースを下に移動
function moveDown() {
  if (!checkCollision(currentPiece, currentX, currentY + 1)) {
    currentY++;
  } else {
    lockPiece();
    checkPatternMatch();
    spawnPiece();
  }
}

// ピースをボードに固定
function lockPiece() {
  for (let row = 0; row < currentPiece.length; row++) {
    for (let col = 0; col < currentPiece[row].length; col++) {
      if (currentPiece[row][col]) {
        const boardY = currentY + row;
        const boardX = currentX + col;
        if (boardY >= 0) {
          board[boardY][boardX] = currentPiece[row][col];
        }
      }
    }
  }
}

// ピースを回転
function rotate() {
  const rotated = currentPiece[0].map((_, i) => currentPiece.map((row) => row[i]).reverse());

  if (!checkCollision(rotated, currentX, currentY)) {
    currentPiece = rotated;
  }
}

// 左に移動
function moveLeft() {
  if (!checkCollision(currentPiece, currentX - 1, currentY)) {
    currentX--;
  }
}

// 右に移動
function moveRight() {
  if (!checkCollision(currentPiece, currentX + 1, currentY)) {
    currentX++;
  }
}

// ハードドロップ
function hardDrop() {
  while (!checkCollision(currentPiece, currentX, currentY + 1)) {
    currentY++;
  }
  lockPiece();
  checkPatternMatch();
  spawnPiece();
}

// 新しいターゲットパターンを設定
function setNewTargetPattern() {
  targetPattern = ERROR_PATTERNS[Math.floor(Math.random() * ERROR_PATTERNS.length)];
  drawTargetPattern();
  document.getElementById("patternName").textContent = targetPattern.name;
}

// ターゲットパターンを描画
function drawTargetPattern() {
  if (!targetPattern) return;

  const blockSize = 20;
  patternCtx.fillStyle = "#1e1e1e";
  patternCtx.fillRect(0, 0, patternCanvas.width, patternCanvas.height);

  for (let row = 0; row < PATTERN_SIZE; row++) {
    for (let col = 0; col < PATTERN_SIZE; col++) {
      if (targetPattern.pattern[row][col]) {
        patternCtx.fillStyle = "#f48771";
        patternCtx.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
        patternCtx.strokeStyle = "#3e3e42";
        patternCtx.strokeRect(col * blockSize, row * blockSize, blockSize, blockSize);
      }
    }
  }
}

// パターンマッチを確認
function checkPatternMatch() {
  for (let startRow = 0; startRow <= ROWS - PATTERN_SIZE; startRow++) {
    for (let startCol = 0; startCol <= COLS - PATTERN_SIZE; startCol++) {
      if (matchesPattern(startRow, startCol)) {
        clearPattern(startRow, startCol);
        score += 100;
        updateScore();
        setNewTargetPattern();
        return;
      }
    }
  }
}

// 指定位置でパターンが一致するか確認
function matchesPattern(startRow, startCol) {
  for (let row = 0; row < PATTERN_SIZE; row++) {
    for (let col = 0; col < PATTERN_SIZE; col++) {
      const cellValue = board[startRow + row][startCol + col];
      // ボイドブロック（8）はパターンマッチでは空として扱う
      const hasBlock = cellValue !== 0 && cellValue !== 8;
      const needsBlock = targetPattern.pattern[row][col] === 1;

      if (hasBlock !== needsBlock) {
        return false;
      }
    }
  }
  return true;
}

// マッチしたパターンをクリア
function clearPattern(startRow, startCol) {
  // ボード上の全ブロックをクリア
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      board[row][col] = 0;
    }
  }
}

// スコア表示を更新
function updateScore() {
  document.getElementById("score").textContent = score;
}

// キーボード入力を処理
function handleKeyPress(e) {
  if (gameOver) return;

  switch (e.key) {
    case "ArrowLeft":
      e.preventDefault();
      if (!isPaused) moveLeft();
      break;
    case "ArrowRight":
      e.preventDefault();
      if (!isPaused) moveRight();
      break;
    case "ArrowDown":
      e.preventDefault();
      if (!isPaused) moveDown();
      break;
    case "ArrowUp":
      e.preventDefault();
      if (!isPaused) rotate();
      break;
    case " ":
      e.preventDefault();
      if (!isPaused) hardDrop();
      break;
    case "p":
    case "P":
      e.preventDefault();
      togglePause();
      break;
  }
}

// 一時停止を切り替え
function togglePause() {
  isPaused = !isPaused;
  document.getElementById("status").textContent = isPaused ? "一時停止" : "プレイ中...";
}

// ゲーム終了
function endGame() {
  gameOver = true;
  document.getElementById("finalScore").textContent = score;
  document.getElementById("gameOver").classList.add("show");
}

// ページ読み込み時にゲームを開始
window.addEventListener("load", init);
