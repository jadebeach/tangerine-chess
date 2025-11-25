import React from 'react';

/**
 * GameControls Component
 * Main game control buttons (New Game, Flip Board, Analyze)
 */
const GameControls = ({ 
  onNewGame, 
  onFlipBoard, 
  onAnalyzeGame, 
  hasMoves 
}) => {
  return (
    <div className="panel">
      <h3 className="panel-header">Controls</h3>
      
      <button
        onClick={onNewGame}
        className="btn-primary mb-3"
      >
        New Game
      </button>

      <button
        onClick={onFlipBoard}
        className="btn-secondary mb-3"
      >
        Flip Board
      </button>

      {hasMoves && (
        <button
          onClick={onAnalyzeGame}
          className="w-full py-3.5 px-4 bg-green-500 text-white rounded font-semibold text-base
                     hover:bg-green-600 active:scale-[0.97] transition-all duration-200"
        >
          Analyze Game
        </button>
      )}
    </div>
  );
};

export default GameControls;
