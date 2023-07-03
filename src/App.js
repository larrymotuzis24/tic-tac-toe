import React, { useState } from 'react';
import Board from './components/Board';
import { setPlayerName } from './store/gameSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  const [playerName, setPlayer] = useState('');

  const handleInputChange = (e) => {
    setPlayer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any action with the submitted name, such as dispatching an action or updating the state
    dispatch(setPlayerName(playerName))
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Tic Tac Toe</h1>
      <div className="max-w-xl">
        <form onSubmit={handleSubmit}>
          <label htmlFor="playerName" className="text-xl mb-2">
            Enter your name:
          </label>
          <input
            type="text"
            id="playerName"
            className="border border-gray-300 rounded px-3 py-2 mb-4"
            value={playerName}
            onChange={handleInputChange}
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Submit
          </button>
        </form>
        <Board playerName={playerName} />
      </div>
    </div>
  );
}

export default App;
