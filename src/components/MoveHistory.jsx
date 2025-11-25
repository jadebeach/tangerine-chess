import React, { useRef, useEffect } from 'react';

/**
 * MoveHistory Component
 * Displays the game's move history in algebraic notation
 */
const MoveHistory = ({ moves, currentMoveIndex, onMoveClick }) => {
  const historyRef = useRef(null);

  useEffect(() => {
    if (historyRef.current && currentMoveIndex >= 0) {
      const moveElement = historyRef.current.children[Math.floor(currentMoveIndex / 2)];
      if (moveElement) {
        moveElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentMoveIndex]);

  // Group moves into pairs (white, black)
  const movePairs = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1]
    });
  }

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-sm p-4 max-h-[400px] overflow-y-auto font-mono text-sm scrollbar-thin">
      <div ref={historyRef}>
        {movePairs.map((pair, index) => (
          <div 
            key={index}
            className={`
              flex items-center px-2 py-1 rounded-sm mb-0.5
              ${index * 2 <= currentMoveIndex ? 'bg-gray-200' : 'bg-transparent'}
            `}
          >
            <span className="w-10 font-semibold text-gray-600">
              {pair.moveNumber}.
            </span>
            <span
              onClick={() => onMoveClick(index * 2)}
              className={`
                flex-1 px-2 py-1 cursor-pointer rounded-sm transition-all duration-150
                ${currentMoveIndex === index * 2 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-300'
                }
              `}
            >
              {pair.white.san}
            </span>
            {pair.black && (
              <span
                onClick={() => onMoveClick(index * 2 + 1)}
                className={`
                  flex-1 px-2 py-1 cursor-pointer rounded-sm transition-all duration-150
                  ${currentMoveIndex === index * 2 + 1 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-gray-300'
                  }
                `}
              >
                {pair.black.san}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoveHistory;
