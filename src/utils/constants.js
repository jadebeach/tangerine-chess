/**
 * Unicode symbols for chess pieces (fallback)
 */
export const PIECE_SYMBOLS = {
  'p': '♟', 'n': '♞', 'b': '♝', 'r': '♜', 'q': '♛', 'k': '♚',
  'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕', 'K': '♔'
};

/**
 * Get piece image path
 * @param {string} type - Piece type (p, n, b, r, q, k)
 * @param {string} color - Piece color (w or b)
 * @returns {string} Path to piece image
 */
export const getPieceImage = (type, color) => {
  const colorPrefix = color === 'w' ? 'white' : 'black';
  const pieceNames = {
    'p': 'pawn',
    'n': 'knight',
    'b': 'bishop',
    'r': 'rook',
    'q': 'queen',
    'k': 'king'
  };
  return `/pieces/${colorPrefix}-${pieceNames[type]}.svg`;
};

/**
 * Game mode constants
 */
export const GAME_MODES = {
  LOCAL: 'local',
  CPU: 'cpu',
  TUTOR: 'tutor',
  REVIEW: 'review'
};

/**
 * Color constants
 */
export const COLORS = {
  WHITE: 'white',
  BLACK: 'black'
};

/**
 * Board files and ranks
 */
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

/**
 * Get files based on board orientation
 */
export const getFiles = (orientation) => {
  return orientation === COLORS.WHITE ? FILES : [...FILES].reverse();
};

/**
 * Get ranks based on board orientation
 */
export const getRanks = (orientation) => {
  return orientation === COLORS.WHITE ? RANKS : [...RANKS].reverse();
};

/**
 * Check if square is light colored
 */
export const isLightSquare = (file, rank, orientation) => {
  const files = getFiles(orientation);
  const ranks = getRanks(orientation);
  return (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0;
};
