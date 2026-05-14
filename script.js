// Game Board Configuration
const BOARD_SIZE = 100;
const GRID_SIZE = 10;

// Snake and Ladder positions (key: head position, value: tail/base position)
const snakes = {
    17: 4,
    54: 31,
    62: 19,
    87: 36,
    93: 73,
    99: 79
};

const ladders = {
    3: 22,
    12: 33,
    27: 50,
    42: 68,
    51: 72,
    61: 80,
    72: 90
};

// Game State
let player1Position = 1;
let player2Position = 1;
let currentPlayer = 1;
let gameOver = false;

// DOM Elements
const gameBoard = document.getElementById('gameBoard');
const rollButton = document.getElementById('rollButton');
const resetButton = document.getElementById('resetButton');
const diceResult = document.getElementById('diceResult');
const player1PositionDisplay = document.getElementById('player1-position');
const player2PositionDisplay = document.getElementById('player2-position');
const winnerModal = document.getElementById('winnerModal');
const winnerText = document.getElementById('winnerText');

// Initialize Game
function initGame() {
    gameBoard.innerHTML = '';
    player1Position = 1;
    player2Position = 1;
    currentPlayer = 1;
    gameOver = false;
    diceResult.textContent = "Roll the dice to start!";
    rollButton.disabled = false;
    winnerModal.classList.add('hidden');
    
    renderBoard();
    updatePositionDisplay();
}

// Render Game Board
function renderBoard() {
    gameBoard.innerHTML = '';
    
    for (let i = 1; i <= BOARD_SIZE; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        
        const cellContent = document.createElement('div');
        cellContent.className = 'cell-content';
        
        // Add cell number
        const cellNumber = document.createElement('span');
        cellNumber.className = 'cell-number';
        cellNumber.textContent = i;
        cell.appendChild(cellNumber);
        
        // Add snake or ladder indicator
        if (snakes[i]) {
            const snake = document.createElement('span');
            snake.className = 'snake';
            snake.textContent = '🐍';
            cellContent.appendChild(snake);
        } else if (ladders[i]) {
            const ladder = document.createElement('span');
            ladder.className = 'ladder';
            ladder.textContent = '🪜';
            cellContent.appendChild(ladder);
        }
        
        // Add players
        if (player1Position === i) {
            const player1 = document.createElement('div');
            player1.className = 'player1';
            cellContent.appendChild(player1);
        }
        
        if (player2Position === i) {
            const player2 = document.createElement('div');
            player2.className = 'player2';
            cellContent.appendChild(player2);
        }
        
        cell.appendChild(cellContent);
        
        // Add grid direction (reverse every other row for snake and ladder board style)
        const rowIndex = Math.floor((i - 1) / GRID_SIZE);
        const isReverseRow = rowIndex % 2 === 1;
        
        const positionInRow = (i - 1) % GRID_SIZE;
        const actualPosition = isReverseRow 
            ? (rowIndex + 1) * GRID_SIZE - positionInRow
            : i;
        
        gameBoard.appendChild(cell);
    }
}

// Update position display
function updatePositionDisplay() {
    player1PositionDisplay.textContent = `Position: ${player1Position}`;
    player2PositionDisplay.textContent = `Position: ${player2Position}`;
}

// Roll Dice
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Move Player
function movePlayer(diceValue) {
    if (gameOver) return;
    
    let newPosition;
    
    if (currentPlayer === 1) {
        newPosition = player1Position + diceValue;
        
        if (newPosition > BOARD_SIZE) {
            newPosition = BOARD_SIZE - (newPosition - BOARD_SIZE);
            diceResult.textContent = `Player 1 rolled ${diceValue}. Exceeded 100, bouncing back to ${newPosition}!`;
        } else if (newPosition === BOARD_SIZE) {
            diceResult.textContent = `🎉 Player 1 reached 100! Player 1 WINS! 🎉`;
            gameOver = true;
            showWinner('Player 1 (Red) Wins!');
            rollButton.disabled = true;
            renderBoard();
            return;
        } else {
            diceResult.textContent = `Player 1 rolled ${diceValue}. Moved to ${newPosition}.`;
        }
        
        player1Position = newPosition;
        
        // Check for snake
        if (snakes[player1Position]) {
            diceResult.textContent += ` 🐍 Oops! Snake bite! Slid down to ${snakes[player1Position]}.`;
            player1Position = snakes[player1Position];
        }
        
        // Check for ladder
        if (ladders[player1Position]) {
            diceResult.textContent += ` 🪜 Great! Climbed up to ${ladders[player1Position]}!`;
            player1Position = ladders[player1Position];
        }
        
        currentPlayer = 2;
    } else {
        newPosition = player2Position + diceValue;
        
        if (newPosition > BOARD_SIZE) {
            newPosition = BOARD_SIZE - (newPosition - BOARD_SIZE);
            diceResult.textContent = `Player 2 rolled ${diceValue}. Exceeded 100, bouncing back to ${newPosition}!`;
        } else if (newPosition === BOARD_SIZE) {
            diceResult.textContent = `🎉 Player 2 reached 100! Player 2 WINS! 🎉`;
            gameOver = true;
            showWinner('Player 2 (Blue) Wins!');
            rollButton.disabled = true;
            renderBoard();
            return;
        } else {
            diceResult.textContent = `Player 2 rolled ${diceValue}. Moved to ${newPosition}.`;
        }
        
        player2Position = newPosition;
        
        // Check for snake
        if (snakes[player2Position]) {
            diceResult.textContent += ` 🐍 Oops! Snake bite! Slid down to ${snakes[player2Position]}.`;
            player2Position = snakes[player2Position];
        }
        
        // Check for ladder
        if (ladders[player2Position]) {
            diceResult.textContent += ` 🪜 Great! Climbed up to ${ladders[player2Position]}!`;
            player2Position = ladders[player2Position];
        }
        
        currentPlayer = 1;
    }
    
    updatePositionDisplay();
    renderBoard();
}

// Show Winner Modal
function showWinner(playerName) {
    winnerText.textContent = playerName;
    winnerModal.classList.remove('hidden');
}

// Event Listeners
rollButton.addEventListener('click', () => {
    if (!gameOver) {
        const dice = rollDice();
        movePlayer(dice);
    }
});

resetButton.addEventListener('click', initGame);

// Initialize game on load
window.addEventListener('load', initGame);
