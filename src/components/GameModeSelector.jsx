import React from 'react';
import { GAME_MODES } from '../utils/constants';

/**
 * GameModeSelector Component
 * Allows user to select the game mode
 */
const GameModeSelector = ({ gameMode, onGameModeChange }) => {
  const modes = [
    { id: GAME_MODES.LOCAL, label: 'Local Play', icon: '👥' },
    { id: GAME_MODES.CPU, label: 'vs Computer', icon: '🤖' },
    { id: GAME_MODES.TUTOR, label: 'AI Tutor', icon: '🎓' },
    { id: GAME_MODES.REVIEW, label: 'Review', icon: '📊' }
  ];

  return (
    <div className="panel">
      <h3 className="panel-header">Game Mode</h3>
      <div className="grid grid-cols-2 gap-2">
        {modes.map(mode => (
          <button
            key={mode.id}
            onClick={() => onGameModeChange(mode.id)}
            className={`
              py-3 px-4 rounded text-sm font-semibold
              flex items-center justify-center gap-2
              transition-all duration-200
              ${gameMode === mode.id 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }
            `}
          >
            <span>{mode.icon}</span>
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameModeSelector;
