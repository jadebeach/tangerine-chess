/**
 * Lichess Cloud Analysis API Service
 * Free API for chess position evaluation
 * Rate limit: ~60 requests per minute
 */

const LICHESS_API_BASE = 'https://lichess.org/api';

/**
 * Get best move from Lichess cloud analysis
 * @param {string} fen - Position in FEN notation
 * @param {number} depth - Analysis depth (1-20, default 15)
 * @returns {Promise<{move: string, evaluation: number}>}
 */
export async function getBestMoveFromLichess(fen, depth = 15) {
  try {
    // Lichess cloud eval API endpoint
    const response = await fetch(`${LICHESS_API_BASE}/cloud-eval`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Add FEN and depth as query parameters
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`Lichess API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract best move and evaluation
    if (data.pvs && data.pvs[0]) {
      const bestLine = data.pvs[0];
      return {
        move: bestLine.moves.split(' ')[0], // First move in principal variation
        evaluation: bestLine.cp || (bestLine.mate ? bestLine.mate * 10000 : 0),
        depth: data.depth,
      };
    }

    throw new Error('No analysis available from Lichess');
  } catch (error) {
    console.error('Lichess API error:', error);
    throw error;
  }
}

/**
 * Alternative: Use Lichess analysis board API
 * This requires posting the FEN to get analysis
 */
export async function analyzePosWithLichess(fen) {
  try {
    const url = new URL(`${LICHESS_API_BASE}/cloud-eval`);
    url.searchParams.append('fen', fen);
    url.searchParams.append('multiPv', '1');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`Lichess API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lichess analysis error:', error);
    throw error;
  }
}
