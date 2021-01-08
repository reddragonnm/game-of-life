let running = false;
let placeCell = false;

let cols = 50;
let rows = 23;

let tileSize = 25;
let board = new Array(rows);

function keyPressed() {
  if (key == 'r') running = true;
}

function mousePressed() {
  placeCell = true;
}

function mouseReleased() {
  placeCell = false;
}

function setup() {
  createCanvas(cols * tileSize, rows * tileSize);

  for (let i = 0; i < rows; i++) {
    board[i] = new Array(cols)
    for (let j = 0; j < cols; j++) {
      board[i][j] = false;
    }
  }
}

function showBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j]) fill('yellow');
      else fill('coral')

      strokeWeight(2);
      stroke('lightblue');
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

  if (running) {
    nextGen();
    frameRate(20);
  }

  if (placeCell) {
    let i = floor(map(mouseX, 0, width, 0, cols));
    let j = floor(map(mouseY, 0, height, 0, rows));

    board[j][i] = true;
  }
}