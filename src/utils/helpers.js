/**
 * Format evaluation score for display
 * @param {object} evaluation - Evaluation object with centipawns or mate
 * @returns {string} Formatted score string
 */
export const formatEvaluation = (evaluation) => {
  if (!evaluation) return '0.0';
  
  if (evaluation.mate !== null) {
    return `M${Math.abs(evaluation.mate)}`;
  } else if (evaluation.centipawns !== null) {
    return (evaluation.centipawns / 100).toFixed(1);
  }
  
  return '0.0';
};

/**
 * Calculate evaluation bar percentage
 * @param {object} evaluation - Evaluation object
 * @returns {number} Percentage (0-100)
 */
export const getEvaluationPercentage = (evaluation) => {
  if (!evaluation) return 50;
  
  if (evaluation.mate !== null) {
    return evaluation.mate > 0 ? 100 : 0;
  } else if (evaluation.centipawns !== null) {
    const normalizedScore = Math.max(-10, Math.min(10, evaluation.centipawns / 100));
    return 50 + (normalizedScore * 5);
  }
  
  return 50;
};

/**
 * Get position evaluation description
 * @param {object} evaluation - Evaluation object
 * @returns {string} Human-readable description
 */
export const getEvaluationDescription = (evaluation) => {
  if (!evaluation) return 'Analyzing position...';
  
  if (evaluation.mate !== null) {
    return `Mate in ${Math.abs(evaluation.mate)} for ${evaluation.mate > 0 ? 'White' : 'Black'}`;
  }
  
  if (evaluation.centipawns !== null) {
    const cp = evaluation.centipawns;
    const score = (cp / 100).toFixed(2);
    
    if (Math.abs(cp) < 50) {
      return `Score: ${score} - Position is roughly equal`;
    } else if (cp >= 50 && cp < 200) {
      return `Score: ${score} - White has a slight advantage`;
    } else if (cp <= -50 && cp > -200) {
      return `Score: ${score} - Black has a slight advantage`;
    } else if (cp >= 200) {
      return `Score: ${score} - White has a significant advantage`;
    } else if (cp <= -200) {
      return `Score: ${score} - Black has a significant advantage`;
    }
  }
  
  return 'Analyzing position...';
};

/**
 * Check if game is over and return status message
 * @param {Chess} game - Chess.js game instance
 * @returns {string} Status message
 */
export const getGameStatus = (game) => {
  if (game.isCheckmate()) {
    return `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`;
  } else if (game.isDraw()) {
    return 'Draw!';
  } else if (game.isCheck()) {
    return 'Check!';
  }
  return '';
};
