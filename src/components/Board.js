import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { makeMove, resetGame } from "../store/gameSlice";
import { calculateAIMove } from "../calculateAIMove";

const Board = () => {
  const gameState = useSelector(state => state.game.gameState);
  const currentPlayer = useSelector(state => state.game.currentPlayer);
  const winner = useSelector(state => state.game.winner);
  const dispatch = useDispatch();
  const playerName = useSelector(state => state.game.playerName);
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  
  const handleAIMove = () => {
    if (!winner && currentPlayer === 'O') {
      setIsComputerThinking(true);
      setTimeout(() => {
        const aiMove = calculateAIMove(gameState);
        dispatch(makeMove({ index: aiMove }));
        setIsComputerThinking(false); 
      }, 1000); 
    }
  };

  useEffect(() => {
    if (winner) {
      if (winner === 'X') {
        alert(`${playerName} wins`);
      } else {
        alert('Computer got you this time');
      }
      dispatch(resetGame());
    } else if (!winner && currentPlayer === 'O') {
      handleAIMove();
    }
  }, [gameState, currentPlayer, winner]);



  const handleCellClick = (index) => {
    if (!gameState[index] && !winner) {
      dispatch(makeMove({ index }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <div className="max-w-xl w-full relative">
        {isComputerThinking ? (
          <div className="flex justify-center absolute bottom-full w-full mb-2">
            <p className="text-white">Computer is thinking...</p>
          </div>
        ) : (
          <div className="flex justify-center absolute bottom-full w-full mb-2">
            <p className="text-white">Your Turn</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 mx-auto">
        {gameState.map((cell, index) => (
          <button
            onClick={() => handleCellClick(index)}
            className={`w-24 h-24 border border-gray-700 bg-gradient-to-br from-purple-500 to-indigo-500 flex justify-center items-center text-4xl font-bold text-white hover:opacity-75 transition duration-300 ${cell === 'X' ? 'text-green-400' : 'text-red-400'}`}
            key={index}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
  
}

export default Board;
