const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 75;
const paddleHeight = 10;
const paddleXStart = (canvas.width - paddleWidth) / 2;

let paddleX = paddleXStart;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 2;
let ballSpeedY = -2;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX + 10 > canvas.width || ballX - 10 < 0) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY - 10 < 0) {
    ballSpeedY = -ballSpeedY;
  } else if (ballY + 10 > canvas.height - paddleHeight) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballSpeedY = -ballSpeedY;
    } else if (ballY + 10 > canvas.height) {
      alert('游戏结束');
      document.location.reload();
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  requestAnimationFrame(updateGame);
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'ArrowLeft') {
    leftPressed = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'ArrowLeft') {
    leftPressed = false;
  }
});

updateGame();
