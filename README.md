# Tangerine Chess (橘中樂)

> *"The pleasure of playing chess"* - A professional chess application inspired by the Chinese idiom 橘中樂 (jú zhōng lè), which refers to the joy and delight found in playing chess.

A modern, full-featured chess application with Stockfish engine integration for playing, learning, and analyzing chess games.

## Features

### 1. Game Modes
- **Local Play**: Two players on the same device
- **Play vs CPU**: Challenge Stockfish engine
  - Adjustable difficulty (1-20 levels)
  - Choose White or Black
  - Automatic board orientation
  
### 2. Game Review & Analysis
- Complete move history recording
- Navigate to any position in the game
- Real-time Stockfish position evaluation
- Visual evaluation bar showing position advantage
- Navigation controls (Start/Previous/Next/End)

### 3. AI Tutor Mode
- Real-time best move suggestions from Stockfish
- Tactical explanations with evaluation scores
- Capture warnings, check alerts, and strategic advice

### 4. UI/UX Design
- **Responsive Design**: Powered by Tailwind CSS
- **Multi-Device Support**: Optimized for PC and touchscreen
- **Stoic Aesthetic**: Clean interface with calm color palette
- **Visual Feedback**: Legal move highlighting, piece selection emphasis

## Project Structure

```
chess-app/
├── src/
│   ├── components/          # React components
│   │   ├── ChessBoard.jsx   # Chess board display
│   │   ├── EvaluationBar.jsx # Position evaluation bar
│   │   ├── MoveHistory.jsx   # Move history display
│   │   ├── AITutorPanel.jsx  # AI tutor suggestions
│   │   ├── GameModeSelector.jsx # Game mode selection
│   │   ├── CPUSettings.jsx   # CPU configuration
│   │   ├── GameControls.jsx  # Game control buttons
│   │   ├── NavigationControls.jsx # Move navigation
│   │   ├── PositionEvaluation.jsx # Position analysis
│   │   └── StatusDisplay.jsx # Game status messages
│   ├── hooks/               # Custom React hooks
│   │   └── useStockfish.js  # Stockfish engine integration
│   ├── utils/               # Utility functions
│   │   ├── constants.js     # Constants and definitions
│   │   └── helpers.js       # Helper functions
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles with Tailwind
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## Getting Started

### Requirements
- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The app will be available at `http://localhost:3000` by default.

## Technology Stack

- **React 18**: UI framework
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **chess.js**: Chess logic and rules library
- **Stockfish.js**: Browser-based chess engine

## Component Architecture

### Core Components

#### ChessBoard
Manages board display and piece placement. Handles click events and highlights legal moves.

#### EvaluationBar
Vertical bar displaying Stockfish evaluation with visual representation of position advantage.

#### MoveHistory
Displays move history in algebraic notation. Allows clicking to navigate to any position.

#### AITutorPanel
Shows AI tutor suggestions with best move recommendations and explanations in tutor mode.

### Custom Hooks

#### useStockfish
Manages communication with Stockfish engine. Provides methods for getting best moves and evaluating positions.

## Customization

### Color Customization
Customize the color theme in `tailwind.config.js`:

```javascript
colors: {
  'board-light': '#e8dcc0',  // Light squares
  'board-dark': '#a67c52',   // Dark squares
  'primary': '#4a90e2',      // Accent color
  'background': '#f0ebe3',   // Background
}
```

### Stockfish Configuration
Adjust engine settings in `src/hooks/useStockfish.js`:
- Skill level
- Think time
- Search depth

## Design Philosophy

Tangerine Chess embodies the spirit of 橘中樂 (jú zhōng lè) - finding pleasure in the art of chess. The application combines:

- **Accessibility**: Easy to use for beginners, powerful enough for advanced players
- **Education**: AI tutor mode helps players improve their understanding
- **Analysis**: Deep position evaluation and game review capabilities
- **Aesthetics**: Clean, focused interface that doesn't distract from the game

## License

MIT License

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgments

- Stockfish chess engine team
- chess.js library maintainers
- The ancient Chinese tradition of chess as a source of joy and wisdom