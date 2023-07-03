import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { makeMove } from "../store/gameSlice";

const Board = () => {
  const gameState = useSelector(state => state.game.gameState);
  const currentPlayer = useSelector(state => state.game.currentPlayer);
  const winner = useSelector(state => state.game.winner);
  const dispatch = useDispatch();

  const handleCellClick = (index) => {
    if (!gameState[index] && !winner) {
      dispatch(makeMove({ index }));
    }
  };

    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="grid grid-cols-3 gap-4">
          {gameState.map((cell, index) => (
            <button onClick={() => handleCellClick(index)} className="w-24 h-24 border border-gray-300 bg-white flex justify-center items-center text-4xl font-bold" key={index}>
              {cell}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default Board;
  