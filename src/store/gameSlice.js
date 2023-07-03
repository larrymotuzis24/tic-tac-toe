import { createSlice } from '@reduxjs/toolkit';

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
        console.log(state, action)
     
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
