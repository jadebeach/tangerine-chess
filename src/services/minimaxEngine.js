import { Chess } from 'chess.js';

/**
 * Simple chess engine using minimax algorithm with alpha-beta pruning
 * Used as a fallback when cloud API is unavailable
 */

// Piece values for material evaluation
const PIECE_VALUES = {
  p: 100,   // pawn
  n: 320,   // knight
  b: 330,   // bishop
  r: 500,   // rook
  q: 900,   // queen
  k: 20000  // king
};

// Position bonuses for pieces (encourages good placement)
const POSITION_BONUS = {
  p: [ // pawns
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
  ],
  n: [ // knights
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
  ],
  b: [ // bishops
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20]
  ],
  r: [ // rooks
    [0,  0,  0,  0,  0,  0,  0,  0],
    [5, 10, 10, 10, 10, 10, 10,  5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [0,  0,  0,  5,  5,  0,  0,  0]
  ],
  q: [ // queen
    [-20,-10,-10, -5, -5,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5,  5,  5,  5,  0,-10],
    [-5,  0,  5,  5,  5,  5,  0, -5],
    [0,  0,  5,  5,  5,  5,  0, -5],
    [-10,  5,  5,  5,  5,  5,  0,-10],
    [-10,  0,  5,  0,  0,  0,  0,-10],
    [-20,-10,-10, -5, -5,-10,-10,-20]
  ],
  k: [ // king
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],
    [-10,-20,-20,-20,-20,-20,-20,-10],
    [20, 20,  0,  0,  0,  0, 20, 20],
    [20, 30, 10,  0,  0, 10, 30, 20]
  ]
};

/**
 * Evaluate a chess position
 * @param {Chess} game - Chess.js game instance
 * @returns {number} - Evaluation score (positive = white better, negative = black better)
 */
function evaluatePosition(game) {
  let score = 0;
  const board = game.board();

  // Check for checkmate or stalemate
  if (game.isCheckmate()) {
    return game.turn() === 'w' ? -999999 : 999999;
  }
  if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
    return 0;
  }

  // Material and position evaluation
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const value = PIECE_VALUES[piece.type];
        const posBonus = POSITION_BONUS[piece.type]?.[row]?.[col] || 0;

        if (piece.color === 'w') {
          score += value + posBonus;
        } else {
          // For black, flip the board vertically
          const blackRow = 7 - row;
          const blackPosBonus = POSITION_BONUS[piece.type]?.[blackRow]?.[col] || 0;
          score -= value + blackPosBonus;
        }
      }
    }
  }

  return score;
}

/**
 * Minimax algorithm with alpha-beta pruning
 * @param {Chess} game - Chess.js game instance
 * @param {number} depth - Search depth
 * @param {number} alpha - Alpha value for pruning
 * @param {number} beta - Beta value for pruning
 * @param {boolean} isMaximizing - True if maximizing player (white)
 * @returns {number} - Best evaluation score
 */
function minimax(game, depth, alpha, beta, isMaximizing) {
  if (depth === 0) {
    return evaluatePosition(game);
  }

  const moves = game.moves({ verbose: true });

  if (moves.length === 0) {
    return evaluatePosition(game);
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const evaluation = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break; // Beta cutoff
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const evaluation = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break; // Alpha cutoff
    }
    return minEval;
  }
}

/**
 * Get the best move using minimax algorithm
 * @param {string} fen - Position in FEN notation
 * @param {number} depth - Search depth (default: 3)
 * @returns {{move: string, evaluation: number}} - Best move and its evaluation
 */
export function getBestMoveWithMinimax(fen, depth = 3) {
  const game = new Chess(fen);
  const moves = game.moves({ verbose: true });

  if (moves.length === 0) {
    throw new Error('No legal moves available');
  }

  let bestMove = null;
  let bestValue = game.turn() === 'w' ? -Infinity : Infinity;

  console.log(`Minimax: Analyzing ${moves.length} moves at depth ${depth}...`);

  for (const move of moves) {
    game.move(move);
    const value = minimax(
      game,
      depth - 1,
      -Infinity,
      Infinity,
      game.turn() === 'w'
    );
    game.undo();

    const isBetter = game.turn() === 'w'
      ? value > bestValue
      : value < bestValue;

    if (isBetter) {
      bestValue = value;
      bestMove = move.san;
    }
  }

  console.log(`Minimax: Best move is ${bestMove} (eval: ${bestValue})`);

  return {
    move: bestMove,
    evaluation: bestValue,
  };
}
