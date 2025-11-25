import React, { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from './components/ChessBoard';
import EvaluationBar from './components/EvaluationBar';
import MoveHistory from './components/MoveHistory';
import AITutorPanel from './components/AITutorPanel';
import GameModeSelector from './components/GameModeSelector';
import CPUSettings from './components/CPUSettings';
import GameControls from './components/GameControls';
import NavigationControls from './components/NavigationControls';
import PositionEvaluation from './components/PositionEvaluation';
import StatusDisplay from './components/StatusDisplay';
import { useStockfish } from './hooks/useStockfish';
import { GAME_MODES, COLORS } from './utils/constants';
import { getGameStatus } from './utils/helpers';

/**
 * Main Chess Application Component
 */
const App = () => {
  // Game state
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.board());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
  const [reviewMode, setReviewMode] = useState(false);
  const [orientation, setOrientation] = useState(COLORS.WHITE);

  // Game settings
  const [gameMode, setGameMode] = useState(GAME_MODES.LOCAL);
  const [cpuColor, setCpuColor] = useState(COLORS.BLACK);
  const [cpuDifficulty, setCpuDifficulty] = useState(10);

  // UI state
  const [evaluation, setEvaluation] = useState(null);
  const [tutorAdvice, setTutorAdvice] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [gameStatus, setGameStatus] = useState('');

  const { isReady, getBestMove, evaluatePosition } = useStockfish();

  // Update position from game state
  const updatePosition = useCallback(() => {
    setPosition(game.board());
    setGameStatus(getGameStatus(game));
  }, [game]);

  // Evaluate current position
  useEffect(() => {
    if (isReady && (gameMode === GAME_MODES.REVIEW || gameMode === GAME_MODES.TUTOR)) {
      const fen = reviewMode && currentMoveIndex >= 0 
        ? moveHistory[currentMoveIndex].fen 
        : game.fen();
      evaluatePosition(fen, setEvaluation);
    }
  }, [game, isReady, gameMode, reviewMode, currentMoveIndex, moveHistory, evaluatePosition]);

  // Generate tutor advice
  const generateTutorAdvice = useCallback(() => {
    if (gameMode !== GAME_MODES.TUTOR || !isReady || !evaluation) return;

    const fen = game.fen();
    getBestMove(fen, 20, (bestMove) => {
      const moves = game.moves({ verbose: true });
      const bestMoveObj = moves.find(m => `${m.from}${m.to}` === bestMove.slice(0, 4));
      
      if (bestMoveObj) {
        let advice = `Consider ${bestMoveObj.san}. `;
        
        if (evaluation.mate !== null) {
          advice += `This leads to mate in ${Math.abs(evaluation.mate)} moves.`;
        } else if (evaluation.centipawns !== null) {
          const score = (evaluation.centipawns / 100).toFixed(1);
          if (Math.abs(evaluation.centipawns) > 200) {
            advice += `This gives a significant advantage (${score > 0 ? '+' : ''}${score}).`;
          } else {
            advice += `This maintains balance (${score > 0 ? '+' : ''}${score}).`;
          }
        }

        if (bestMoveObj.captured) {
          advice += ` This move captures the ${bestMoveObj.captured}.`;
        }
        if (game.isCheck()) {
          advice += ` You're in check - defend your king!`;
        }

        setTutorAdvice(advice);
      }
    });
  }, [game, gameMode, isReady, evaluation, getBestMove]);

  // CPU move logic
  const makeCpuMove = useCallback(() => {
    if (!isReady || isThinking) return;

    setIsThinking(true);
    getBestMove(game.fen(), cpuDifficulty, (move) => {
      try {
        const result = game.move(move, { sloppy: true });
        if (result) {
          setMoveHistory(prev => [...prev, { 
            san: result.san, 
            move: result,
            fen: game.fen()
          }]);
          setCurrentMoveIndex(prev => prev + 1);
          updatePosition();
        }
      } catch (error) {
        console.error('Invalid CPU move:', error);
      }
      setIsThinking(false);
    });
  }, [game, isReady, isThinking, cpuDifficulty, getBestMove, updatePosition]);

  // Trigger CPU move
  useEffect(() => {
    if (gameMode === GAME_MODES.CPU && game.turn() === cpuColor[0] && !game.isGameOver() && !reviewMode) {
      const timer = setTimeout(() => makeCpuMove(), 500);
      return () => clearTimeout(timer);
    }
  }, [game, gameMode, cpuColor, makeCpuMove, reviewMode]);

  // Square click handler
  const handleSquareClick = useCallback((square) => {
    if (reviewMode) return;
    if (gameMode === GAME_MODES.CPU && game.turn() === cpuColor[0]) return;

    if (selectedSquare) {
      try {
        const move = game.move({
          from: selectedSquare,
          to: square,
          promotion: 'q'
        });

        if (move) {
          setMoveHistory(prev => [...prev, { 
            san: move.san, 
            move: move,
            fen: game.fen()
          }]);
          setCurrentMoveIndex(prev => prev + 1);
          updatePosition();
          setSelectedSquare(null);
          setLegalMoves([]);

          if (gameMode === GAME_MODES.TUTOR) {
            setTimeout(() => generateTutorAdvice(), 1000);
          }
          return;
        }
      } catch (error) {
        // Invalid move, try selecting new piece
      }
    }

    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true });
      setLegalMoves(moves.map(m => m.to));
    } else {
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  }, [game, selectedSquare, gameMode, cpuColor, reviewMode, updatePosition, generateTutorAdvice]);

  // Move navigation
  const handleMoveClick = useCallback((index) => {
    setReviewMode(true);
    setCurrentMoveIndex(index);
    
    const newGame = new Chess();
    for (let i = 0; i <= index; i++) {
      newGame.move(moveHistory[i].move);
    }
    setGame(newGame);
    setPosition(newGame.board());
  }, [moveHistory]);

  const goToStart = () => {
    setReviewMode(true);
    setCurrentMoveIndex(-1);
    const newGame = new Chess();
    setGame(newGame);
    setPosition(newGame.board());
  };

  const goToPrevious = () => {
    if (currentMoveIndex > -1) {
      handleMoveClick(currentMoveIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentMoveIndex < moveHistory.length - 1) {
      handleMoveClick(currentMoveIndex + 1);
    }
  };

  const goToEnd = () => {
    setReviewMode(false);
    setCurrentMoveIndex(moveHistory.length - 1);
    const newGame = new Chess();
    moveHistory.forEach(m => newGame.move(m.move));
    setGame(newGame);
    setPosition(newGame.board());
  };

  // Game controls
  const startNewGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setPosition(newGame.board());
    setMoveHistory([]);
    setCurrentMoveIndex(-1);
    setSelectedSquare(null);
    setLegalMoves([]);
    setReviewMode(false);
    setGameStatus('');
    setTutorAdvice(null);
    setEvaluation(null);
  };

  const analyzeGame = () => {
    setGameMode(GAME_MODES.REVIEW);
    setReviewMode(true);
    setCurrentMoveIndex(moveHistory.length - 1);
  };

  const handleCpuColorChange = (color) => {
    setCpuColor(color);
    setOrientation(color === COLORS.BLACK ? COLORS.WHITE : COLORS.BLACK);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-board-light px-4 py-6 md:px-6 lg:px-8 flex justify-center items-start">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_auto_400px] gap-4 md:gap-6 items-start">
        {/* Left Panel - Controls */}
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="panel">
            <h1 className="m-0 mb-2 text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
              Tangerine Chess
            </h1>
            <p className="m-0 text-base text-gray-600 italic">
              橘中樂 · Powered by Stockfish
            </p>
          </div>


          <GameModeSelector gameMode={gameMode} onGameModeChange={setGameMode} />

          {gameMode === GAME_MODES.CPU && (
            <CPUSettings
              cpuColor={cpuColor}
              cpuDifficulty={cpuDifficulty}
              onCpuColorChange={handleCpuColorChange}
              onCpuDifficultyChange={setCpuDifficulty}
            />
          )}

          <GameControls
            onNewGame={startNewGame}
            onFlipBoard={() => setOrientation(orientation === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE)}
            onAnalyzeGame={analyzeGame}
            hasMoves={moveHistory.length > 0}
          />

          <StatusDisplay gameStatus={gameStatus} isThinking={isThinking} />
        </div>

        {/* Center - Chess Board */}
        <div className="flex gap-3 items-center justify-center">
          <EvaluationBar evaluation={evaluation} />
          <ChessBoard
            position={position}
            onSquareClick={handleSquareClick}
            selectedSquare={selectedSquare}
            legalMoves={legalMoves}
            lastMove={moveHistory[currentMoveIndex]?.move}
            orientation={orientation}
          />
        </div>

        {/* Right Panel - History & Analysis */}
        <div className="flex flex-col gap-4">
          {moveHistory.length > 0 && (
            <>
              <NavigationControls
                currentMoveIndex={currentMoveIndex}
                totalMoves={moveHistory.length}
                reviewMode={reviewMode}
                onGoToStart={goToStart}
                onGoPrevious={goToPrevious}
                onGoNext={goToNext}
                onGoToEnd={goToEnd}
              />

              <div className="panel">
                <h3 className="panel-header">Move History</h3>
                <MoveHistory
                  moves={moveHistory}
                  currentMoveIndex={currentMoveIndex}
                  onMoveClick={handleMoveClick}
                />
              </div>
            </>
          )}

          <AITutorPanel tutorAdvice={tutorAdvice} isActive={gameMode === GAME_MODES.TUTOR} />

          {evaluation && (gameMode === GAME_MODES.REVIEW || gameMode === GAME_MODES.TUTOR) && (
            <PositionEvaluation evaluation={evaluation} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
