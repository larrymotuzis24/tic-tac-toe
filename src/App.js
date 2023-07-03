import React from 'react';
import Board from './components/Board';
import './App.css'; // Import custom CSS file

function App() {
  return (
    <div className="app-container">
      <h1 className="text-4xl font-bold mb-6">Tic Tac Toe</h1>
      <div className="board-container">
        <Board />
      </div>
    </div>
  );
}

export default App;
