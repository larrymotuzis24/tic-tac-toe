// Function to calculate the winner based on the current game state
const calculateWinner = (gameState) => {
    // List of winning combinations
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];
  
    // Iterate through the winning combinations and check if any player has a winning combination
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return gameState[a]; // Return the winning symbol ('X' or 'O')
      }
    }
  
    return null; // Return null if there is no winner
  };

  export { calculateWinner };