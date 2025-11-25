/**
 * Unicode symbols for chess pieces
 */
export const PIECE_SYMBOLS = {
  'p': '♟', 'n': '♞', 'b': '♝', 'r': '♜', 'q': '♛', 'k': '♚',
  'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕', 'K': '♔'
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
