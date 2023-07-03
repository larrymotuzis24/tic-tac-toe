import { createSlice } from '@reduxjs/toolkit';
import { calculateWinner } from '../calculateWinner';
import { calculateAIMove } from '../calculateAIMove';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gameState: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isTie: false,
  },
  reducers: {
    makeMove: (state, action) => {
        const { index } = action.payload;
        const currentPlayer = state.currentPlayer;
  
        // Update the current player's move in the game state
        state.gameState[index] = currentPlayer;
  
        // Check for a winner
        const winner = calculateWinner(state.gameState);
        if (winner) {
          state.winner = winner;
        }
  
        // Toggle the current player
        state.currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
        // AI move
        if (!state.winner && !state.isTie && state.currentPlayer === 'O') {
          const aiMove = calculateAIMove(state.gameState);
          state.gameState[aiMove] = 'O';
          const aiWinner = calculateWinner(state.gameState);
          if (aiWinner) {
            state.winner = aiWinner;
          }
          state.currentPlayer = 'X';
        }
    },
    resetGame: (state) => {
      state.gameState = Array(9).fill(null);
      state.currentPlayer = 'X';
      state.winner = null;
      state.isTie = false;
    },
  },
});

export const { makeMove, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
