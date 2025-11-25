import React from 'react';
import { COLORS } from '../utils/constants';

/**
 * CPUSettings Component
 * Settings panel for CPU opponent configuration
 */
const CPUSettings = ({ cpuColor, cpuDifficulty, onCpuColorChange, onCpuDifficultyChange }) => {
  return (
    <div className="panel">
      <h3 className="panel-header">Computer Settings</h3>
      
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold text-gray-600">
          Play as:
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => onCpuColorChange(COLORS.BLACK)}
            className={`
              flex-1 py-2.5 rounded text-sm font-semibold
              transition-all duration-200
              ${cpuColor === COLORS.BLACK 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }
            `}
          >
            ♔ White
          </button>
          <button
            onClick={() => onCpuColorChange(COLORS.WHITE)}
            className={`
              flex-1 py-2.5 rounded text-sm font-semibold
              transition-all duration-200
              ${cpuColor === COLORS.WHITE 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }
            `}
          >
            ♚ Black
          </button>
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-600">
          Difficulty: {cpuDifficulty}/20
        </label>
        <input
          type="range"
          min="1"
          max="20"
          value={cpuDifficulty}
          onChange={(e) => onCpuDifficultyChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
        />
      </div>
    </div>
  );
};

export default CPUSettings;
