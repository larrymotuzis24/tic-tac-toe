export function getBestMove(gameState, currentPlayer) {
    const AI_PLAYER = 'O';
    const OPPONENT_PLAYER = 'X';
  
    // Function to check if the game has ended
    function isGameOver(state) {
      // Check for a win
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (state[a] && state[a] === state[b] && state[a] === state[c]) {
          return true; // Game has been won
        }
      }
  
      // Check for a draw
      return state.filter(cell => cell === null).length === 0;
    }
  
    // Recursive minimax function with alpha-beta pruning
    function minimax(state, depth, maximizingPlayer, alpha, beta) {
      if (isGameOver(state)) {
        // Return the score based on the game outcome
        if (currentPlayer === AI_PLAYER) {
          return depth - 10; // AI wins
        } else {
          return 10 - depth; // Opponent wins
        }
      }
  
      if (maximizingPlayer) {
        let maxScore = -Infinity;
        let bestMove = null;
  
        for (let i = 0; i < state.length; i++) {
          if (state[i] === null) {
            state[i] = AI_PLAYER; // Place AI player's symbol in the current cell
  
            // Call minimax recursively for the opponent's turn
            const score = minimax(state, depth + 1, false, alpha, beta);
  
            state[i] = null; // Undo the move
  
            // Update the maxScore and bestMove
            if (score > maxScore || bestMove === null) {
                maxScore = score;
                bestMove = i;
              }
  
            // Perform alpha-beta pruning
            alpha = Math.max(alpha, maxScore);
            if (alpha >= beta) {
              break;
            }
          }
        }
  
        if (depth === 0) {
          return bestMove;
        }
  
        return maxScore;
      } else {
        let minScore = Infinity;
  
        for (let i = 0; i < state.length; i++) {
          if (state[i] === null) {
            state[i] = OPPONENT_PLAYER; // Place opponent player's symbol in the current cell
  
            // Call minimax recursively for the AI player's turn
            const score = minimax(state, depth + 1, true, alpha, beta);
  
            state[i] = null; // Undo the move
  
            // Update the minScore
            minScore = Math.min(minScore, score);
  
            // Perform alpha-beta pruning
            beta = Math.min(beta, minScore);
            if (beta <= alpha) {
              break;
            }
          }
        }
  
        return minScore;
      }
    }
  
    let bestScore = -Infinity;
    let bestMove = null;
  
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === null) {
        gameState[i] = AI_PLAYER; // Place AI player's symbol in the current cell
  
        // Call minimax recursively for the opponent's turn
        const score = minimax(gameState, 0, false, -Infinity, Infinity);
  
        gameState[i] = null; // Undo the move
  
        // Update the bestScore and bestMove
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
  
    return bestMove;
  }
  