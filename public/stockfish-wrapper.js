// Stockfish Worker Wrapper
// Properly configures the Stockfish WASM module path

// Set the base URL before loading Stockfish
self.Module = {
  locateFile: function(path) {
    // Ensure WASM file is loaded from the root directory
    if (path.endsWith('.wasm')) {
      return '/stockfish.wasm';
    }
    return path;
  }
};

// Now import the actual Stockfish engine
importScripts('/stockfish.js');

// The Stockfish() function returns a promise
Stockfish().then(function(sf) {
  // Forward messages from main thread to Stockfish
  self.onmessage = function(e) {
    sf.postMessage(e.data);
  };

  // Forward Stockfish output to main thread
  sf.addMessageListener(function(line) {
    self.postMessage(line);
  });
});
