// Game state
let gameState = {
    player1Position: 0,
    player2Position: 0,
    currentPlayer: 1,
    gameOver: false,
    snakes: {
        17: 4,
        54: 31,
        62: 18,
        87: 24,
        93: 73,
        99: 79
    },
    ladders: {
        1: 38,
        7: 14,
        21: 42,
        28: 84,
        51: 67,
        72: 91,
        80: 99
    }
};

// Initialize game board
function initializeBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    const cells = [];
    for (let i = 0; i < 100; i++) {
        cells.push(i + 1);
    }
    
    // Reverse rows to match snake & ladder game layout
    const boardCells = [];
    for (let row = 9; row >= 0; row--) {
        if (row % 2 === 0) {
            for (let col = 0; col < 10; col++) {
                boardCells.push(row * 10 + col + 1);
            }
        } else {
            for (let col = 9; col >= 0; col--) {
                boardCells.push(row * 10 + col + 1);
            }
        }
    }
    
    boardCells.forEach(cellNum => {
        const cell = document.createElement('div');
        cell.id = `cell-${cellNum}`;
        cell.className = 'cell';
        
        const cellContent = document.createElement('div');
        cellContent.className = 'cell-content';
        
        // Add snake or ladder indicator
        if (gameState.snakes[cellNum]) {
            const snake = document.createElement('span');
            snake.className = 'snake';
            snake.textContent = '🐍';
            cellContent.appendChild(snake);
        } else if (gameState.ladders[cellNum]) {
            const ladder = document.createElement('span');
            ladder.className = 'ladder';
            ladder.textContent = '🪜';
            cellContent.appendChild(ladder);
        }
        
        const cellNumber = document.createElement('span');
        cellNumber.className = 'cell-number';
        cellNumber.textContent = cellNum;
        
        cell.appendChild(cellContent);
        cell.appendChild(cellNumber);
        gameBoard.appendChild(cell);
    });
}

// Roll dice function
function rollDice() {
    if (gameState.gameOver) {
        alert('Game is over! Click Reset to play again.');
        return;
    }
    
    const diceValue = Math.floor(Math.random() * 6) + 1;
    const diceResult = document.getElementById('diceResult');
    diceResult.textContent = `🎲 Rolled: ${diceValue}`;
    
    // Move player
    movePlayer(diceValue);
}

// Move player function
function movePlayer(diceValue) {
    if (gameState.currentPlayer === 1) {
        gameState.player1Position += diceValue;
        
        // Check if exceeded 100
        if (gameState.player1Position > 100) {
            gameState.player1Position -= diceValue;
            document.getElementById('diceResult').textContent += ' - Can\'t move beyond 100!';
            switchPlayer();
            return;
        }
        
        // Check for snake
        if (gameState.snakes[gameState.player1Position]) {
            const snakeEnd = gameState.snakes[gameState.player1Position];
            document.getElementById('diceResult').textContent += ` - 🐍 Snake! Sliding from ${gameState.player1Position} to ${snakeEnd}`;
            gameState.player1Position = snakeEnd;
        }
        // Check for ladder
        else if (gameState.ladders[gameState.player1Position]) {
            const ladderEnd = gameState.ladders[gameState.player1Position];
            document.getElementById('diceResult').textContent += ` - 🪜 Ladder! Climbing from ${gameState.player1Position} to ${ladderEnd}`;
            gameState.player1Position = ladderEnd;
        }
        
        document.getElementById('player1Position').textContent = gameState.player1Position;
        
        // Check win condition
        if (gameState.player1Position === 100) {
            gameState.gameOver = true;
            showWinModal('Player 1 (Red) Wins! 🎉');
            return;
        }
    } else {
        gameState.player2Position += diceValue;
        
        // Check if exceeded 100
        if (gameState.player2Position > 100) {
            gameState.player2Position -= diceValue;
            document.getElementById('diceResult').textContent += ' - Can\'t move beyond 100!';
            switchPlayer();
            return;
        }
        
        // Check for snake
        if (gameState.snakes[gameState.player2Position]) {
            const snakeEnd = gameState.snakes[gameState.player2Position];
            document.getElementById('diceResult').textContent += ` - 🐍 Snake! Sliding from ${gameState.player2Position} to ${snakeEnd}`;
            gameState.player2Position = snakeEnd;
        }
        // Check for ladder
        else if (gameState.ladders[gameState.player2Position]) {
            const ladderEnd = gameState.ladders[gameState.player2Position];
            document.getElementById('diceResult').textContent += ` - 🪜 Ladder! Climbing from ${gameState.player2Position} to ${ladderEnd}`;
            gameState.player2Position = ladderEnd;
        }
        
        document.getElementById('player2Position').textContent = gameState.player2Position;
        
        // Check win condition
        if (gameState.player2Position === 100) {
            gameState.gameOver = true;
            showWinModal('Player 2 (Blue) Wins! 🎉');
            return;
        }
    }
    
    // Update board visualization
    updateBoard();
    
    // Switch player
    setTimeout(switchPlayer, 1500);
}

// Switch current player
function switchPlayer() {
    gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    const currentPlayerElement = document.getElementById('currentPlayer');
    currentPlayerElement.textContent = gameState.currentPlayer === 1 ? 'Player 1' : 'Player 2';
}

// Update board visualization
function updateBoard() {
    // Clear all player positions
    document.querySelectorAll('.player1, .player2').forEach(el => el.remove());
    
    // Update player 1 position
    const player1Cell = document.getElementById(`cell-${gameState.player1Position}`);
    if (player1Cell) {
        const player1El = document.createElement('div');
        player1El.className = 'player1';
        player1Cell.appendChild(player1El);
    }
    
    // Update player 2 position
    const player2Cell = document.getElementById(`cell-${gameState.player2Position}`);
    if (player2Cell) {
        const player2El = document.createElement('div');
        player2El.className = 'player2';
        player2Cell.appendChild(player2El);
    }
}

// Show win modal
function showWinModal(message) {
    document.getElementById('winMessage').textContent = message;
    document.getElementById('winModal').classList.remove('hidden');
}

// Reset game
function resetGame() {
    gameState.player1Position = 0;
    gameState.player2Position = 0;
    gameState.currentPlayer = 1;
    gameState.gameOver = false;
    
    document.getElementById('player1Position').textContent = '0';
    document.getElementById('player2Position').textContent = '0';
    document.getElementById('currentPlayer').textContent = 'Player 1';
    document.getElementById('diceResult').textContent = '';
    document.getElementById('winModal').classList.add('hidden');
    
    updateBoard();
}

// Initialize game on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeBoard();
    updateBoard();
});