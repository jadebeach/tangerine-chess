import { useState, useEffect, useCallback } from 'react';
import { analyzePosWithLichess } from '../services/lichessApi';
import { getBestMoveWithMinimax } from '../services/minimaxEngine';

/**
 * Custom hook for chess engine integration
 * Uses Lichess cloud API with minimax fallback
 */
export const useStockfish = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const [useCloudEngine, setUseCloudEngine] = useState(true);

  useEffect(() => {
    // Engine is always ready (no initialization needed)
    console.log('✓ Chess engine ready (Lichess API + Minimax fallback)');
    setIsReady(true);
    setError(null);
  }, []);

  /**
   * Get best move for current position
   * @param {string} fen - FEN position string
   * @param {number} skillLevel - Skill level (1-20, used for minimax depth)
   * @param {function} callback - Callback function to receive best move
   */
  const getBestMove = useCallback(async (fen, skillLevel = 10, callback) => {
    try {
      let bestMove;

      if (useCloudEngine) {
        try {
          // Try Lichess cloud API first
          console.log('Requesting analysis from Lichess cloud...');
          const analysis = await analyzePosWithLichess(fen);

          if (analysis && analysis.pvs && analysis.pvs[0]) {
            bestMove = analysis.pvs[0].moves.split(' ')[0];
            console.log(`✓ Lichess cloud: ${bestMove}`);
          } else {
            throw new Error('No analysis available');
          }
        } catch (cloudError) {
          console.warn('Lichess cloud unavailable, falling back to minimax:', cloudError.message);
          setUseCloudEngine(false);
          throw cloudError;
        }
      }

      // If cloud failed or disabled, use minimax
      if (!bestMove) {
        const depth = Math.min(Math.floor(skillLevel / 5) + 2, 5); // depth 2-5 based on skill
        console.log(`Using minimax engine (depth ${depth})...`);
        const result = getBestMoveWithMinimax(fen, depth);
        bestMove = result.move;
        console.log(`✓ Minimax: ${bestMove}`);
      }

      if (callback) {
        callback(bestMove);
      }
    } catch (err) {
      console.error('Engine error:', err);

      // Last resort: use minimax at low depth
      try {
        console.log('Using minimax as last resort...');
        const result = getBestMoveWithMinimax(fen, 2);
        if (callback) {
          callback(result.move);
        }
      } catch (minimaxError) {
        setError('Failed to get best move');
        console.error('Minimax also failed:', minimaxError);
      }
    }
  }, [useCloudEngine]);

  /**
   * Evaluate current position
   * @param {string} fen - FEN position string
   * @param {function} callback - Callback function to receive evaluation
   */
  const evaluatePosition = useCallback(async (fen, callback) => {
    try {
      if (useCloudEngine) {
        try {
          // Try Lichess cloud API first
          const analysis = await analyzePosWithLichess(fen);

          if (analysis && analysis.pvs && analysis.pvs[0]) {
            const pv = analysis.pvs[0];
            callback({
              centipawns: pv.cp || null,
              mate: pv.mate || null,
              pv: pv.moves.split(' ')[0],
            });
            return;
          }
        } catch (cloudError) {
          console.warn('Lichess cloud unavailable, falling back to minimax');
          setUseCloudEngine(false);
        }
      }

      // Fallback to minimax evaluation
      const result = getBestMoveWithMinimax(fen, 3);
      callback({
        centipawns: result.evaluation,
        mate: null,
        pv: result.move,
      });
    } catch (err) {
      console.error('Evaluation error:', err);
      setError('Failed to evaluate position');
    }
  }, [useCloudEngine]);

  return { isReady, error, getBestMove, evaluatePosition };
};
