# 🐍 Snake & Ladder Game 🪜

A fun, interactive implementation of the classic Snake and Ladder board game built with HTML, CSS, and JavaScript!

## 🎮 Features

- **Two-Player Mode**: Red vs Blue players
- **10x10 Board**: Navigate through 100 squares
- **6 Snakes**: Slide down when landing on snake heads
- **7 Ladders**: Climb up when landing on ladder bases
- **Dice Rolling**: Random 1-6 rolls with smooth animations
- **Real-time Updates**: Live position tracking for both players
- **Win Detection**: First player to reach 100 wins!
- **Responsive Design**: Works perfectly on desktop and mobile
- **Beautiful UI**: Modern gradient theme with smooth transitions

## 📋 Game Rules

1. 🏆 First player to reach square 100 wins the game
2. 🎲 Players take turns rolling the dice
3. 🐍 If you land on a snake head, you slide down to its tail
4. 🪜 If you land on a ladder base, you climb up to its top
5. ➡️ You cannot move beyond square 100 - if your roll takes you past it, stay in place and it becomes the other player's turn

## 🐍 Snakes Positions

| Head | Tail |
|------|------|
| 17 | 4 |
| 54 | 31 |
| 62 | 18 |
| 87 | 24 |
| 93 | 73 |
| 99 | 79 |

## 🪜 Ladders Positions

| Base | Top |
|------|-----|
| 1 | 38 |
| 7 | 14 |
| 21 | 42 |
| 28 | 84 |
| 51 | 67 |
| 72 | 91 |
| 80 | 99 |

## 🚀 How to Play

1. **Open the Game**: Open `index.html` in your web browser
2. **Roll Dice**: Click the "🎲 Roll Dice" button to roll
3. **Move**: Your piece moves forward by the number on the dice
4. **Special Squares**: 
   - Land on a snake 🐍 and slide down
   - Land on a ladder 🪜 and climb up
5. **Win**: First to reach 100 wins!
6. **Reset**: Click "🔄 Reset Game" to start over

## 📁 File Structure

```
snake-ladder-game/
├── index.html      # Game HTML structure
├── style.css       # Game styling and animations
├── script.js       # Game logic and mechanics
└── README.md       # This file
```

## 🛠️ Technologies Used

- **HTML5**: Game structure and layout
- **CSS3**: Styling, animations, and responsive design
- **JavaScript**: Game logic, state management, and interactivity

## 🎨 Design Features

- **Gradient Background**: Beautiful purple gradient theme
- **Smooth Animations**: Hover effects and transitions
- **Visual Feedback**: Clear indication of current player and dice results
- **Responsive Layout**: Adapts to different screen sizes
- **Color-Coded Players**: Red for Player 1, Blue for Player 2

## 🎯 Game Mechanics

### Board Layout
- The board is arranged in a 10x10 grid (100 squares total)
- Numbers flow left-to-right on even rows, right-to-left on odd rows (classic snake & ladder style)

### Turn System
- Players alternate turns
- Each turn, a player rolls the dice and moves accordingly
- If a player lands on a snake, they slide down
- If a player lands on a ladder, they climb up

### Win Condition
- First player to land exactly on square 100 wins
- Cannot move past 100

## 🎮 Future Enhancements

Potential features for future versions:
- Multiple difficulty levels
- AI opponent mode
- Customizable snake and ladder positions
- Sound effects
- Score tracking and statistics
- Multiplayer online mode
- Dark mode theme

## 📝 License

This project is open source and available for personal and educational use.

## 👨‍💻 Author

Created by Archanachaurasiya30

---

**Enjoy the game! 🎉**