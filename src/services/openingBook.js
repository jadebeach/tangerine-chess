/**
 * Opening Book Database
 * Contains common chess openings and their variations
 */

export const OPENING_BOOK = {
  // Starting position
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1': {
    moves: ['e4', 'd4', 'Nf3', 'c4'],
    opening: 'Starting Position',
    tips: [
      'Control the center with pawns (e4, d4)',
      'Develop your knights before bishops',
      'Castle early for king safety',
      'Don\'t move the same piece twice in the opening'
    ]
  },

  // After 1. e4
  'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1': {
    moves: ['e5', 'c5', 'e6', 'c6', 'd5'],
    opening: 'King\'s Pawn Opening',
    tips: [
      'e5: Classical response, fighting for the center',
      'c5: Sicilian Defense, asymmetric and aggressive',
      'e6: French Defense, solid but somewhat passive',
      'c6: Caro-Kann, safe and solid'
    ]
  },

  // After 1. e4 e5
  'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2': {
    moves: ['Nf3', 'Bc4', 'Nc3'],
    opening: 'Open Game',
    tips: [
      'Nf3: Develops knight and attacks e5 pawn',
      'Bc4: Italian-style, aims at f7 weakness',
      'Nc3: Prepares for King\'s Knight and Vienna systems'
    ]
  },

  // After 1. e4 e5 2. Nf3
  'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2': {
    moves: ['Nc6', 'd6', 'Nf6'],
    opening: 'King\'s Knight Opening',
    tips: [
      'Nc6: Defends e5, most popular',
      'd6: Philidor Defense, solid but passive',
      'Nf6: Petrov Defense, symmetric and solid'
    ]
  },

  // After 1. e4 e5 2. Nf3 Nc6 3. Bb5 (Ruy Lopez)
  'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3': {
    moves: ['a6', 'Nf6', 'd6'],
    opening: 'Ruy Lopez',
    tips: [
      'a6: Morphy Defense, asks what the bishop wants',
      'Nf6: Berlin Defense, very solid',
      'd6: Steinitz Defense, classical approach'
    ]
  },

  // After 1. e4 e5 2. Nf3 Nc6 3. Bc4 (Italian Game)
  'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3': {
    moves: ['Bc5', 'Nf6', 'd6'],
    opening: 'Italian Game',
    tips: [
      'Bc5: Giuoco Piano, classical Italian',
      'Nf6: Two Knights Defense, sharp',
      'd6: Hungarian Defense, solid'
    ]
  },

  // After 1. e4 c5 (Sicilian)
  'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2': {
    moves: ['Nf3', 'Nc3', 'c3'],
    opening: 'Sicilian Defense',
    tips: [
      'Nf3: Open Sicilian, most critical',
      'Nc3: Closed Sicilian, positional',
      'c3: Alapin Variation, solid'
    ]
  },

  // After 1. d4
  'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1': {
    moves: ['d5', 'Nf6', 'f5', 'e6'],
    opening: 'Queen\'s Pawn Opening',
    tips: [
      'd5: Classical response, fights for center',
      'Nf6: Indian Defenses, hypermodern approach',
      'f5: Dutch Defense, aggressive',
      'e6: Leads to French-style positions'
    ]
  },

  // After 1. d4 d5
  'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2': {
    moves: ['c4', 'Nf3', 'e3', 'Bf4'],
    opening: 'Closed Game',
    tips: [
      'c4: Queen\'s Gambit, classical',
      'Nf3: Leads to quiet systems',
      'e3: Colle System, solid',
      'Bf4: London System, popular'
    ]
  },

  // After 1. d4 Nf6
  'rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2': {
    moves: ['c4', 'Nf3', 'Bg5'],
    opening: 'Indian Defense',
    tips: [
      'c4: Prepares for Indian systems',
      'Nf3: Flexible development',
      'Bg5: Trompowsky Attack, aggressive'
    ]
  },

  // After 1. d4 Nf6 2. c4
  'rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2': {
    moves: ['e6', 'g6', 'd5', 'c5'],
    opening: 'Indian Game',
    tips: [
      'e6: Nimzo-Indian or Queen\'s Indian',
      'g6: King\'s Indian Defense, fighting',
      'd5: Declines the gambit, solid',
      'c5: Benoni systems, sharp'
    ]
  },

  // After 1. c4 (English Opening)
  'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq c3 0 1': {
    moves: ['e5', 'Nf6', 'c5', 'e6'],
    opening: 'English Opening',
    tips: [
      'e5: Reversed Sicilian',
      'Nf6: Flexible, wait-and-see',
      'c5: Symmetrical English',
      'e6: Prepares d5'
    ]
  },

  // After 1. Nf3
  'rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1': {
    moves: ['d5', 'Nf6', 'c5', 'd6'],
    opening: 'Zukertort Opening',
    tips: [
      'd5: Classical center',
      'Nf6: Symmetrical development',
      'c5: English-style setup',
      'd6: Indian-style development'
    ]
  }
};

/**
 * Get book moves for a given position
 * @param {string} fen - Position in FEN notation
 * @returns {object|null} - Opening information or null if not in book
 */
export function getBookMoves(fen) {
  return OPENING_BOOK[fen] || null;
}

/**
 * Check if a move is a book move
 * @param {string} fen - Current position FEN
 * @param {string} move - Move in SAN notation
 * @returns {boolean} - True if move is in the opening book
 */
export function isBookMove(fen, move) {
  const bookData = OPENING_BOOK[fen];
  if (!bookData) return false;
  return bookData.moves.includes(move);
}

/**
 * Get opening name for a position
 * @param {string} fen - Position FEN
 * @returns {string|null} - Opening name or null
 */
export function getOpeningName(fen) {
  const bookData = OPENING_BOOK[fen];
  return bookData ? bookData.opening : null;
}

/**
 * Check if position is in the opening phase
 * @param {Chess} game - Chess.js game instance
 * @returns {boolean} - True if in opening (< 12 moves)
 */
export function isInOpening(game) {
  return game.history().length < 12;
}

/**
 * Get opening advice for current position
 * @param {string} fen - Position FEN
 * @param {string} lastMove - Last move played (optional)
 * @returns {string|null} - Advice string or null
 */
export function getOpeningAdvice(fen, lastMove = null) {
  const bookData = OPENING_BOOK[fen];

  if (!bookData) {
    return 'You\'ve left opening theory. Focus on development, king safety, and controlling the center.';
  }

  if (lastMove && bookData.moves.includes(lastMove)) {
    return `Good! ${lastMove} is a book move in the ${bookData.opening}.`;
  }

  return `Consider: ${bookData.moves.join(', ')}. These are the main moves in the ${bookData.opening}.`;
}
