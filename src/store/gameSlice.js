import { createSlice } from '@reduxjs/toolkit';
import { calculateWinner } from '../calculateWinner';

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
        console.log(action)
        const { index } = action.payload;
      const currentPlayer = state.currentPlayer;
      const updatedGameState = [...state.gameState];

      // Check if the cell is already occupied or if there is a winner
      if (updatedGameState[index] || state.winner) {
        return;
      }

      // Update the gameState with the current player's move
      updatedGameState[index] = currentPlayer;

      // Check for a winner or a tie game
      const winner = calculateWinner(updatedGameState);
      const isTie = !updatedGameState.includes(null) && !winner;

      // Update the state with the new game state, current player, winner, and tie status
      state.gameState = updatedGameState;
      state.currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      state.winner = winner;
      state.isTie = isTie;

      if (winner) {
        window.alert(`Player ${winner} wins!`); // Show an alert with the winner
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
