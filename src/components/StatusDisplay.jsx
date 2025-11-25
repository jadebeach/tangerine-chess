import React from 'react';

/**
 * StatusDisplay Component
 * Displays game status messages (checkmate, check, thinking, etc.)
 */
const StatusDisplay = ({ gameStatus, isThinking }) => {
  if (isThinking) {
    return (
      <div className="status-box bg-blue-50 border-2 border-blue-500 text-blue-800">
        🤔 Computer is thinking...
      </div>
    );
  }

  if (gameStatus) {
    const isCheckmate = gameStatus.includes('Checkmate');
    const isDraw = gameStatus.includes('Draw');
    
    return (
      <div className={`
        status-box border-2
        ${isCheckmate ? 'bg-red-50 border-red-500 text-red-800' : ''}
        ${isDraw ? 'bg-gray-50 border-gray-500 text-gray-800' : ''}
        ${!isCheckmate && !isDraw ? 'bg-orange-50 border-orange-500 text-orange-800' : ''}
      `}>
        {gameStatus}
      </div>
    );
  }

  return null;
};

export default StatusDisplay;
