import { calculateWinner } from "./calculateWinner";

const calculateAIMove = (gameState) => {
  const availableMoves = [];

  //find available move
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === null) {
      availableMoves.push(i);
    }
  }

  // Evaluate possible moves via minimax algorithm
  const scores = availableMoves.map((move) => {
    const newGameState = [...gameState];
    newGameState[move] = 'O'; // computer is 'O'

    // Call the minimax function for each move
    const score = minimax(newGameState, 0, false); 
    
    return score;
  });

  // Find the index of the move with the highest score
  const maxScoreIndex = scores.reduce((maxIndex, score, currentIndex) => {
    if (score > scores[maxIndex]) {
      return currentIndex;
    }
    return maxIndex;
  }, 0);

  const aiMove = availableMoves[maxScoreIndex];

  return aiMove;
};

const minimax = (board, depth, maximizingPlayer) => {
  // check for a win, loss, or draw

  const winner = calculateWinner(board);
  if (winner === 'O') {
    return 10 - depth; // Adjust the score based on the depth
  } else if (winner === 'X') {
    return depth - 10; // Adjust the score based on the depth
  } else if (!board.includes(null)) {
    return 0; // Game is a draw
  }

 //evaluate all possible moves

  if (maximizingPlayer) {
    let maxScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = 'O'; // 'O' is the computer's symbol

        const score = minimax(newBoard, depth + 1, false);
        maxScore = Math.max(score, maxScore);
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = 'X';  //'X' is the player's symbol

        const score = minimax(newBoard, depth + 1, true);
        minScore = Math.min(score, minScore);
      }
    }
    return minScore;
  }
};


export { calculateAIMove };
