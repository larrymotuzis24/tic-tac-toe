import { createSlice } from '@reduxjs/toolkit';
import { calculateWinner } from '../calculateWinner';


const gameSlice = createSlice({
  name: 'game',
  initialState: {
    playerName:'',
    gameState: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isTie: false,
  },
  reducers: {
    makeMove: (state, action) => {
      const { index } = action.payload;
      if (!state.gameState[index] && !state.winner) {
        state.gameState[index] = state.currentPlayer;
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
    
        const winner = calculateWinner(state.gameState);
        if (winner) {
          state.winner = winner;
        }
      }
    },
    
    resetGame: (state) => {
        state.gameState = Array.from({ length: 9 }, (_, index) => null);
        state.currentPlayer = 'X';
        state.winner = null;
        state.isTie = false;
      },
    setPlayerName: (state, action) => {
        state.playerName = action.payload;
      },
  },
});

export const { makeMove, resetGame, setPlayerName } = gameSlice.actions;

export default gameSlice.reducer;
