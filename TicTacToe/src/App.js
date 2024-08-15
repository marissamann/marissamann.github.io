//use states to remember values of components
import { useState } from "react"
//create component to return string
//can only return one thing, use closing tags
/*class Square {
public:
    void setValue(const string& str) {
        this->value = str;
    }
private:
    string value;
}*/
//pass function into function
function Square({value, onSquareClick}) {
    //curly braces dynamically evaluate code for value
    //STATE use function to update value
    //DO NOT WRITE value = xxx;
    //  setValue(xxx);
    //const [value, setValue] = useState(null);
    //function handleClick() {
        //all of this code runs in browser, console is in browser
        //console.log("clicked!");
        //setValue("X");
    //}
    return (
    <button
        className="square"
        onClick={onSquareClick}
     >
        {value}
    </button>);
}
export default function Board() {
    //states used here
    const [xIsNext, setXIsNext] = useState(true);
    //array
    const [squares, setSquares] = useState(Array(9).fill(null));
    
    //this function is passed to Square so Board can use it from Squares
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        }
        else {
            nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    }
    else {
        status = "Next Player: " + (xIsNext ? "X" : "O");
    }
    //arrow makes function on the fly (need to pass function not call it)
    //creates function on-the-fly, does not run it until it is called later
    return (<>
    <div className="status">{status}</div>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
            <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
            <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
        
    </>
    );
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }