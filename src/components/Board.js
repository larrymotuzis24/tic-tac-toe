import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { makeMove } from "../store/gameSlice";

const Board = () => {
  const gameState = useSelector(state => state.game.gameState);
  const currentPlayer = useSelector(state => state.game.currentPlayer);
  const winner = useSelector(state => state.game.winner);
  const dispatch = useDispatch();
  const playerName = useSelector(state => state.game.playerName);
  console.log(playerName)

  useEffect(() => {
    console.log(winner)
    if (winner) {
      {winner === 'X' ? alert(`${playerName} wins`) : alert('Computer got you this time')}
    }
  }, [winner]);


  const handleCellClick = (index) => {
    if (!gameState[index] && !winner) {
      dispatch(makeMove({ index }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <div className="grid grid-cols-3 gap-4">
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
