let running = false;
let placeCell = false;

let cols = 40;
let rows = 24;
let tileSize = 25;

let gen;
let board;

function reset() {
  gen = 0;
  running = false;
  board = new Array(rows);

  for (let i = 0; i < rows; i++) {
    board[i] = new Array(cols)
    for (let j = 0; j < cols; j++) {
      board[i][j] = false;
    }
  }
}

function mousePressed() {
  placeCell = true;
}

function mouseReleased() {
  placeCell = false;
}

function setup() {
  let c = createCanvas(cols * tileSize, rows * tileSize);
  select('.canvas').child(c);
  reset();
}

function showBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j]) fill('yellow');
      else fill('black');

      strokeWeight(1);
      stroke(3, 207, 252, 40);
      rect(j * tileSize, i * tileSize, tileSize, tileSize);
    }
  }
}

function getNeighbours(i, j) {
  let arr = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ]

  let n = 0;
  for (let pos of arr) {
    let a = i + pos[0];
    let b = j + pos[1];

    if (0 <= a && a < rows && 0 <= b && b < cols)
      if (board[a][b]) n++;
  }
  return n;
}

function nextGen() {
  let toDie = [];
  let toLive = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let n = getNeighbours(i, j);

      if (board[i][j]) {
        if (n == 2 || n == 3) toLive.push([i, j]);
        else toDie.push([i, j]);
      } else {
        if (n == 3) toLive.push([i, j]);
        else toDie.push([i, j]);
      }
    }
  }

  for (let t of toDie) {
    board[t[0]][t[1]] = false;
  }

  for (let t of toLive) {
    board[t[0]][t[1]] = true;
  }
}

function draw() {
  background(0);
  showBoard();

  fill(255);
  textSize(50);
  noStroke();
  text(`Generation: ${gen}`, 50, 50);

  if (running) {
    nextGen();
    frameRate(20);
    gen++;
  }

  if (!running && placeCell) {
    let i = floor(map(mouseX, 0, width, 0, cols));
    let j = floor(map(mouseY, 0, height, 0, rows));
    if (0 <= mouseX && mouseX < width && 0 <= mouseY && mouseY < height) board[j][i] = true;
  }
}