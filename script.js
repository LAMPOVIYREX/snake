const gameBoard = document.getElementById('game-board');
const snake = document.getElementById('snake');
const food = document.getElementById('food');
const scoreDisplay = document.getElementById('score');

let snakeX = 0;
let snakeY = 0;
let foodX = 0;
let foodY = 0;
let direction = 'right';
let snakeLength = 2;
let snakeSegments = [];
let score = 0;

function updateSnakePosition() {
    switch (direction) {
        case 'right':
            snakeX += 20;
            break;
        case 'left':
            snakeX -= 20;
            break;
        case 'up':
            snakeY -= 20;
            break;
        case 'down':
            snakeY += 20;
            break;
    }

    if (snakeX >= 400) snakeX = 0;
    if (snakeX < 0) snakeX = 380;
    if (snakeY >= 400) snakeY = 0;
    if (snakeY < 0) snakeY = 380;

    snake.style.left = snakeX + 'px';
    snake.style.top = snakeY + 'px';

    snakeSegments.unshift({ x: snakeX, y: snakeY });

    if (snakeSegments.length > snakeLength) {
        const tail = snakeSegments.pop();
        document.querySelector(`[data-x="${tail.x}"][data-y="${tail.y}"]`).remove();
    }

    for (let i = 0; i < snakeSegments.length; i++) {
        const segment = snakeSegments[i];
        let segmentElement = document.querySelector(`[data-x="${segment.x}"][data-y="${segment.y}"]`);
        if (!segmentElement) {
            segmentElement = document.createElement('div');
            segmentElement.style.position = 'absolute';
            segmentElement.style.width = '20px';
            segmentElement.style.height = '20px';
            segmentElement.style.backgroundColor = '#0f0';
            segmentElement.dataset.x = segment.x;
            segmentElement.dataset.y = segment.y;
            gameBoard.appendChild(segmentElement);
        }
        segmentElement.style.left = segment.x + 'px';
        segmentElement.style.top = segment.y + 'px';
    }

    if (snakeX === foodX && snakeY === foodY) {
        snakeLength++;
        score++;
        scoreDisplay.textContent = `Счет: ${score}`;
        placeFood();
    }

    for (let i = 1; i < snakeSegments.length; i++) {
        if (snakeSegments[i].x === snakeX && snakeSegments[i].y === snakeY) {
            clearInterval(gameInterval);
            alert('Игра окончена!');
        }
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * 20) * 20;
    foodY = Math.floor(Math.random() * 20) * 20;
    food.style.left = foodX + 'px';
    food.style.top = foodY + 'px';
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
    }
});

placeFood();
const gameInterval = setInterval(updateSnakePosition, 200);