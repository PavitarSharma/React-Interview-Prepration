import { useState } from 'react'
import Board from './Board'
import Info from './Info';
import "./styles.css";

const TicTacToe = () => {
  const [winner, setWinner] = useState("");
  const [reset, setReset] = useState(false);


  const resetBoard = () => {
    setReset(true)
  }
  return (
    <div className="tic-tac-toe">

      <div className="winner">
        <p className='winner-text'>{winner}</p>
        { winner && <button onClick={resetBoard}>Reset Board</button>}
      </div>
      <Board
        winner={winner}
        setWinner={setWinner}
        reset={reset}
        setReset={setReset}
      />
      <Info />
    </div>
  )
}

export default TicTacToe;