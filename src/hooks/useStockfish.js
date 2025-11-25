import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for Stockfish chess engine integration
 * Provides methods to get best moves and evaluate positions
 */
export const useStockfish = () => {
  const [stockfish, setStockfish] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const responseHandlers = useRef({});

  useEffect(() => {
    let sf;

    try {
      // Initialize Stockfish worker from local file
      sf = new Worker('/stockfish.js');

      sf.onerror = (err) => {
        console.error('Stockfish Worker error:', err);
        console.error('Error message:', err.message);
        console.error('Error filename:', err.filename);
        console.error('Error line:', err.lineno);
        setError(`Failed to load chess engine: ${err.message || 'Unknown error'}`);
        setIsReady(false);
      };

      sf.onmessage = (event) => {
        const message = event.data;
        console.log('Stockfish:', message); // Debug: log all messages

        if (message === 'readyok') {
          console.log('✓ Stockfish is ready!');
          setIsReady(true);
          setError(null);
        }

        // Handle evaluation responses
        if (typeof message === 'string' && message.includes('score')) {
          const handler = responseHandlers.current.evaluation;
          if (handler) handler(message);
        }

        // Handle best move responses
        if (typeof message === 'string' && message.startsWith('bestmove')) {
          const handler = responseHandlers.current.bestmove;
          if (handler) handler(message);
        }
      };

      // Initialize UCI protocol with a slight delay
      console.log('Initializing Stockfish...');
      setTimeout(() => {
        if (sf) {
          console.log('Sending UCI commands...');
          sf.postMessage('uci');
          sf.postMessage('setoption name Skill Level value 10');
          sf.postMessage('isready');
        }
      }, 100);

      setStockfish(sf);
    } catch (err) {
      console.error('Failed to initialize Stockfish:', err);
      setError('Failed to initialize chess engine');
      setIsReady(false);
    }

    return () => {
      if (sf) {
        sf.terminate();
      }
    };
  }, []);

  /**
   * Send command to Stockfish engine
   */
  const sendCommand = useCallback((command, handler = null, type = null) => {
    if (stockfish && isReady) {
      if (handler && type) {
        responseHandlers.current[type] = handler;
      }
      stockfish.postMessage(command);
    }
  }, [stockfish, isReady]);

  /**
   * Get best move for current position
   * @param {string} fen - FEN position string
   * @param {number} skillLevel - Skill level (1-20)
   * @param {function} callback - Callback function to receive best move
   */
  const getBestMove = useCallback((fen, skillLevel = 10, callback) => {
    sendCommand(`setoption name Skill Level value ${skillLevel}`);
    sendCommand(`position fen ${fen}`);
    sendCommand(`go movetime 1000`, (message) => {
      const match = message.match(/bestmove ([a-h][1-8][a-h][1-8][qrbn]?)/);
      if (match && callback) {
        callback(match[1]);
      }
    }, 'bestmove');
  }, [sendCommand]);

  /**
   * Evaluate current position
   * @param {string} fen - FEN position string
   * @param {function} callback - Callback function to receive evaluation
   */
  const evaluatePosition = useCallback((fen, callback) => {
    sendCommand(`position fen ${fen}`);
    sendCommand(`go depth 15`, (message) => {
      const cpMatch = message.match(/score cp (-?\d+)/);
      const mateMatch = message.match(/score mate (-?\d+)/);
      const pvMatch = message.match(/pv (.+)/);
      
      if (callback) {
        callback({
          centipawns: cpMatch ? parseInt(cpMatch[1]) : null,
          mate: mateMatch ? parseInt(mateMatch[1]) : null,
          pv: pvMatch ? pvMatch[1].split(' ')[0] : null
        });
      }
    }, 'evaluation');
  }, [sendCommand]);

  return { isReady, error, getBestMove, evaluatePosition };
};
