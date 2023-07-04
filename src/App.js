import React from 'react';
import Board from './components/Board';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Tic Tac Toe</h1>
      <div className="max-w-4xl p-6 bg-gray-200 rounded-lg">
        <Board />
      </div>
    </div>
  );
}

export default App;
