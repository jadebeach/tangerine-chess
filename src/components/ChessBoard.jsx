import React, { useState } from 'react';
import { PIECE_SYMBOLS, getPieceImage, getFiles, getRanks, isLightSquare } from '../utils/constants';

/**
 * ChessBoard Component
 * Renders the chess board with pieces and highlights
 */
const ChessBoard = ({
  position,
  onSquareClick,
  selectedSquare,
  legalMoves,
  lastMove,
  orientation = 'white'
}) => {
  const files = getFiles(orientation);
  const ranks = getRanks(orientation);
  const [useImages, setUseImages] = useState(true);

  const isLastMoveSquare = (square) => {
    return lastMove && (lastMove.from === square || lastMove.to === square);
  };

  // Helper to convert square notation to array indices
  const getPieceAtSquare = (square) => {
    const fileIndex = 'abcdefgh'.indexOf(square[0]);
    const rankIndex = 8 - parseInt(square[1]); // chess.js board() returns rank 8 at index 0
    return position[rankIndex]?.[fileIndex] || null;
  };

  return (
    <div className="grid grid-cols-8 gap-0 w-full max-w-[560px] aspect-square border-2 border-gray-800 shadow-2xl rounded-sm relative">
      {ranks.map(rank =>
        files.map(file => {
          const square = `${file}${rank}`;
          const piece = getPieceAtSquare(square);
          const isLight = isLightSquare(file, rank, orientation);
          const isSelected = selectedSquare === square;
          const isLegalMove = legalMoves.includes(square);
          const isLastMove = isLastMoveSquare(square);

          return (
            <div
              key={square}
              onClick={() => onSquareClick(square)}
              className={`
                chess-square
                aspect-square
                ${isLight ? 'bg-board-light' : 'bg-board-dark'}
                ${isSelected ? 'border-4 border-primary' : ''}
                ${isLastMove ? 'shadow-[inset_0_0_0_2px_rgba(74,144,226,0.5)]' : ''}
              `}
            >
              {piece && (
                useImages ? (
                  <img
                    src={getPieceImage(piece.type, piece.color)}
                    alt={`${piece.color === 'w' ? 'White' : 'Black'} ${piece.type}`}
                    className={`
                      chess-piece-img
                      w-[85%] h-[85%]
                      ${isSelected ? 'scale-110' : 'scale-100'}
                      transition-transform duration-150
                      pointer-events-none
                    `}
                    draggable={false}
                    onError={() => setUseImages(false)}
                  />
                ) : (
                  <span
                    className={`
                      chess-piece
                      ${piece.color === 'w' ? 'text-gray-900' : 'text-gray-800'}
                      ${isSelected ? 'scale-110' : 'scale-100'}
                    `}
                    style={{
                      textShadow: piece.color === 'w'
                        ? '0 1px 2px rgba(0,0,0,0.1)'
                        : '0 1px 2px rgba(255,255,255,0.1)'
                    }}
                  >
                    {PIECE_SYMBOLS[piece.type.toUpperCase()] || piece.type}
                  </span>
                )
              )}
              
              {isLegalMove && (
                <div className={`
                  absolute pointer-events-none
                  ${piece 
                    ? 'w-full h-full bg-primary/25 border-4 border-primary/60' 
                    : 'w-[30%] h-[30%] rounded-full bg-primary/40'
                  }
                `} />
              )}
              
              {/* Rank labels */}
              {(rank === '1' || rank === '8') && file === 'a' && (
                <span className={`
                  absolute left-1 top-1 text-[0.18em] font-semibold opacity-70
                  ${isLight ? 'text-board-dark' : 'text-board-light'}
                `}>
                  {rank}
                </span>
              )}
              
              {/* File labels */}
              {rank === (orientation === 'white' ? '1' : '8') && (
                <span className={`
                  absolute right-1 bottom-1 text-[0.18em] font-semibold opacity-70
                  ${isLight ? 'text-board-dark' : 'text-board-light'}
                `}>
                  {file}
                </span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
