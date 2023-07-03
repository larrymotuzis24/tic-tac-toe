const calculateAIMove = (gameState) => {
    const availableMoves = [];
  
    // Find all available moves (empty cells)
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === null) {
        availableMoves.push(i);
      }
    }
  
    // Randomly select a move from the available moves
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const aiMove = availableMoves[randomIndex];
  
    return aiMove;
  };

  export { calculateAIMove };