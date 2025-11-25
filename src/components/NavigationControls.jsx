import React from 'react';

/**
 * NavigationControls Component
 * Controls for navigating through move history
 */
const NavigationControls = ({ 
  currentMoveIndex, 
  totalMoves, 
  reviewMode,
  onGoToStart, 
  onGoPrevious, 
  onGoNext, 
  onGoToEnd 
}) => {
  return (
    <div className="panel">
      <h3 className="panel-header">Navigate Moves</h3>
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={onGoToStart}
          disabled={currentMoveIndex === -1}
          className="p-2.5 bg-gray-100 text-gray-800 rounded text-lg
                     hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
          title="Go to start"
        >
          ⏮
        </button>
        <button
          onClick={onGoPrevious}
          disabled={currentMoveIndex === -1}
          className="p-2.5 bg-gray-100 text-gray-800 rounded text-lg
                     hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
          title="Previous move"
        >
          ◀
        </button>
        <button
          onClick={onGoNext}
          disabled={currentMoveIndex >= totalMoves - 1}
          className="p-2.5 bg-gray-100 text-gray-800 rounded text-lg
                     hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
          title="Next move"
        >
          ▶
        </button>
        <button
          onClick={onGoToEnd}
          disabled={!reviewMode}
          className="p-2.5 bg-gray-100 text-gray-800 rounded text-lg
                     hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200"
          title="Go to end"
        >
          ⏭
        </button>
      </div>
    </div>
  );
};

export default NavigationControls;
