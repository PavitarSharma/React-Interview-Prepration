import { useState, useEffect, useRef } from 'react';

const Board = ({ winner, setWinner, reset, setReset }) => {
    // Creating a turn state, which indicates the current turn
    const [turn, setTurn] = useState(0);

    // Creating a data state, which contains the 
    // current picture of the board
    const [data, setData] = useState(['', '', '', '', '',
        '', '', '', ''])

    // Creating a reference for the board
    const boardRef = useRef(null);

    // Function to draw on the board
    const draw = (event, index) => {
        // Draws only if the position is not taken 
        // and winner is not decided yet
        if (data[index - 1] === '' && winner === '') {

            // Draws X if it's player 1's turn else draws O
            const current = turn === 0 ? "X" : "O"

            // Updating the data state
            data[index - 1] = current;

            //Drawing on the board
            event.target.innerText = current;

            // Switching the turn
            setTurn(turn === 0 ? 1 : 0)
        }
    }

    // UseEffect hook used to reset the board whenever 
    // a winner is decided
    useEffect(() => {

        // Clearing the data state
        setData(['', '', '', '', '', '', '', '', '']);

        // Getting all the children(cells) of the board
        const cells = boardRef.current.children

        // Clearing out the board
        for (let i = 0; i < 9; i++) {
            cells[i].innerText = '';
        }

        // Resetting the turn to player 0
        setTurn(0);

        // Resetting the winner
        setWinner('');
        setReset(false);
    }, [reset, setReset, setWinner])


    // useEffect hook used to check for a winner
    useEffect(() => {

        // Checks for the win condition in rows
        const checkRow = () => {
            let ans = false;
            for (let i = 0; i < 9; i += 3) {
                ans = (data[i] === data[i + 1] &&
                    data[i] === data[i + 2] &&
                    data[i] !== '')
            }
            return ans;
        }

        // Checks for the win condition in cols
        const checkCol = () => {
            let ans = false;
            for (let i = 0; i < 3; i++) {
                ans = (data[i] === data[i + 3] &&
                    data[i] === data[i + 6] &&
                    data[i] !== '')
            }
            return ans;
        }

        // Checks for the win condition in diagonals
        const checkDiagonal = () => {
            return ((data[0] === data[4] &&
                data[0] === data[8] && data[0] !== '') ||
                (data[2] === data[4] && data[2] === data[6] &&
                    data[2] !== ''));
        }

        // Checks if at all a win condition is present
        const checkWin = () => {
            return (checkRow() || checkCol() || checkDiagonal());
        }

        // Checks for a tie
        const checkTie = () => {
            let count = 0;
            data.forEach((cell) => {
                if (cell !== '') {
                    count++;
                }
            })
            return count === 9;
        }

        // Setting the winner in case of a win
        if (checkWin()) {
            setWinner(turn === 0 ? "Player 2 Wins!" :
                "Player 1 Wins!");
        } else if (checkTie()) {

            // Setting the winner to tie in case of a tie
            setWinner("It's a Tie!");
        }

    })



    return (
        <div className="board" ref={boardRef}>

            <div onClick={(e) => draw(e, 1)} className="input input1">1</div>
            <div onClick={(e) => draw(e, 2)} className="input input2">2</div>
            <div onClick={(e) => draw(e, 3)} className="input input3">3</div>


            <div onClick={(e) => draw(e, 4)} className="input input4">4</div>
            <div onClick={(e) => draw(e, 5)} className="input input5">5</div>
            <div onClick={(e) => draw(e, 6)} className="input input6">6</div>


            <div onClick={(e) => draw(e, 7)} className="input input7">7</div>
            <div onClick={(e) => draw(e, 8)} className="input input8">8</div>
            <div onClick={(e) => draw(e, 9)} className="input input9">9</div>

        </div>
    )
}

export default Board;