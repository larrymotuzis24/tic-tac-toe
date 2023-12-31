import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { makeMove, resetGame } from "../store/gameSlice";
import { calculateAIMove } from "../calculateAIMove";

const Board = () => {
  const gameState = useSelector(state => state.game.gameState);
  const currentPlayer = useSelector(state => state.game.currentPlayer);
  const winner = useSelector(state => state.game.winner);
  const dispatch = useDispatch();
  const isTie = useSelector(state => state.game.isTie);
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [isUserTurn, setIsUserTurn] = useState(true);
  
  const handleAIMove = () => {
    if (!winner && currentPlayer === 'O') {
      setIsUserTurn(false);
      setIsComputerThinking(true);
      setTimeout(() => {
        const aiMove = calculateAIMove(gameState);
        dispatch(makeMove({ index: aiMove }));
        setIsComputerThinking(false); 
        setIsUserTurn(true);
      }, 1000); 
    }
  };


  useEffect(() => {
    if(isTie){
       alert('Its a Draw');
       dispatch(resetGame())
       
     }
    if (winner) {
      if (winner === 'X') {
        alert(` You win!!!! Can you do it again??`);
        setIsUserTurn(true);
      } else {
        alert('Computer got you this time');
      }
      dispatch(resetGame());
    } else if (!winner && currentPlayer === 'O') {
      handleAIMove();
    }
    // eslint-disable-next-line
  }, [gameState, currentPlayer, winner, isTie]);



  const handleCellClick = (index) => {
    if (!gameState[index] && !winner) {
      setIsUserTurn(false);
      dispatch(makeMove({ index }));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen mx-auto bg-gray-400">
      <div className="max-w-screen-sm p-6 rounded-lg bg-white shadow-md">
        <h1 className="text-4xl font-bold text-center mb-12">Tic Tac Toe</h1>
        <div className="w-full max-w-xs relative">
          {isComputerThinking ? (
            <div className="flex justify-center absolute bottom-full w-full mb-2">
              <p className="text-black">Computer is thinking...</p>
            </div>
          ) : (
            <div className="flex justify-center absolute bottom-full w-full mb-2">
              <p className="text-black">Your Turn</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {gameState.map((cell, index) => (
            <button
              onClick={() => handleCellClick(index)}
              className={`w-16 h-16 border border-gray-700 bg-gradient-to-br from-purple-500 to-indigo-500 flex justify-center items-center text-2xl font-bold text-white hover:opacity-75 transition duration-300 ${
                cell === 'X' ? 'text-green-400' : 'text-red-400'
              }`}
              key={index}
              disabled={!isUserTurn || isComputerThinking}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Board;
