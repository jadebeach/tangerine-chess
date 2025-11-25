// Stockfish Worker Wrapper
// This wrapper properly configures the Stockfish WASM module

self.importScripts('/stockfish.js');

// Configure Stockfish module to locate the WASM file
if (typeof Stockfish === 'function') {
  const stockfish = Stockfish({
    locateFile: function(path) {
      // Map stockfish.wasm to the correct filename
      if (path.endsWith('.wasm')) {
        return '/stockfish.wasm';
      }
      return path;
    }
  });

  // Forward messages between main thread and Stockfish
  self.onmessage = function(e) {
    if (stockfish && stockfish.postMessage) {
      stockfish.postMessage(e.data);
    }
  };

  // Forward Stockfish output to main thread
  if (stockfish && stockfish.addMessageListener) {
    stockfish.addMessageListener(function(line) {
      self.postMessage(line);
    });
  }
} else {
  console.error('Stockfish module not loaded properly');
  self.postMessage('error: Stockfish module not available');
}
