//use states to remember values of components
import { useState } from 'react';
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
function Square({className, value, onSquareClick}) {
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
        className={className}
        onClick={onSquareClick}
     >
        {value}
    </button>);
}
export default function Board() {
    //states used here
    const [blueIsNext, setBlueIsNext] = useState(true);
    //array
    const [squares, setSquares] = useState(Array(42).fill(null));
    //colors array
    const [colors, setColors] = useState(Array(42).fill("square"));

    //this function is passed to Square so Board can use it from Squares
    function handleClick(i) {
        //find drop spot based on column click i
        let col = i%7;
        let n = null;
        for (let j = (35 + col); j >= col; j=j-7) {
            //console.log(j);
            if (squares[j] === null) {
                n = j;
                break;
            }
        }
        //console.log(n);
        //if no open spots in selected column, do nothing
        if (!n && n != 0) {
            return;
        }

        //check for winner
        const firstWinningCheck = calculateWinner(squares)
        let status;
        if (squares[n] != null || firstWinningCheck) {
            return;
        }
        const nextSquares = squares.slice();
        const nextColors = colors.slice();
        if (blueIsNext) {
            nextSquares[n] = "B";
            nextColors[n] = "square-blue";
        }
        else {
            nextSquares[n] = "R";
            nextColors[n] = "square-red";
        }
        //console.log(nextColors[n]);
        //update array with UI contents
        setSquares(nextSquares);
        setColors(nextColors);
        //console.log(colors[n]);
        //write to instruction spot
        setBlueIsNext(!blueIsNext);
    }
    //figure out if winner
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        if (winner === "T") {
            status = "Tie!";
        }
        else {
            status = "Winner: " + winner;
        }
    }
    else {
        status = "Next Player: " + (blueIsNext ? "Blue" : "Red");
    }
    //arrow makes function on the fly (need to pass function not call it)
    //creates function on-the-fly, does not run it until it is called later
    //update UI
    return (<>
    <div className="status">{status}</div>
        <div className="board-row">
            <Square className={colors[0]} value={squares[0]} onSquareClick={() => handleClick(0)}/>
            <Square className={colors[1]} value={squares[1]} onSquareClick={() => handleClick(1)}/>
            <Square className={colors[2]} value={squares[2]} onSquareClick={() => handleClick(2)}/>
            <Square className={colors[3]} value={squares[3]} onSquareClick={() => handleClick(3)}/>
            <Square className={colors[4]} value={squares[4]} onSquareClick={() => handleClick(4)}/>
            <Square className={colors[5]} value={squares[5]} onSquareClick={() => handleClick(5)}/>
            <Square className={colors[6]} value={squares[6]} onSquareClick={() => handleClick(6)}/>
        </div>
        <div className="board-row">
            <Square className={colors[7]} value={squares[7]} onSquareClick={() => handleClick(7)}/>
            <Square className={colors[8]} value={squares[8]} onSquareClick={() => handleClick(8)}/>
            <Square className={colors[9]} value={squares[9]} onSquareClick={() => handleClick(9)}/>
            <Square className={colors[10]} value={squares[10]} onSquareClick={() => handleClick(10)}/>
            <Square className={colors[11]} value={squares[11]} onSquareClick={() => handleClick(11)}/>
            <Square className={colors[12]} value={squares[12]} onSquareClick={() => handleClick(12)}/>
            <Square className={colors[13]} value={squares[13]} onSquareClick={() => handleClick(13)}/>
        </div>
        <div className="board-row">
            <Square className={colors[14]} value={squares[14]} onSquareClick={() => handleClick(14)}/>
            <Square className={colors[15]} value={squares[15]} onSquareClick={() => handleClick(15)}/>
            <Square className={colors[16]} value={squares[16]} onSquareClick={() => handleClick(16)}/>
            <Square className={colors[17]} value={squares[17]} onSquareClick={() => handleClick(17)}/>
            <Square className={colors[18]} value={squares[18]} onSquareClick={() => handleClick(18)}/>
            <Square className={colors[19]} value={squares[19]} onSquareClick={() => handleClick(19)}/>
            <Square className={colors[20]} value={squares[20]} onSquareClick={() => handleClick(20)}/>
        </div>
        <div className="board-row">
            <Square className={colors[21]} value={squares[21]} onSquareClick={() => handleClick(21)}/>
            <Square className={colors[22]} value={squares[22]} onSquareClick={() => handleClick(22)}/>
            <Square className={colors[23]} value={squares[23]} onSquareClick={() => handleClick(23)}/>
            <Square className={colors[24]} value={squares[24]} onSquareClick={() => handleClick(24)}/>
            <Square className={colors[25]} value={squares[25]} onSquareClick={() => handleClick(25)}/>
            <Square className={colors[26]} value={squares[26]} onSquareClick={() => handleClick(26)}/>
            <Square className={colors[27]} value={squares[27]} onSquareClick={() => handleClick(27)}/>
        </div>
        <div className="board-row">
            <Square className={colors[28]} value={squares[28]} onSquareClick={() => handleClick(28)}/>
            <Square className={colors[29]} value={squares[29]} onSquareClick={() => handleClick(29)}/>
            <Square className={colors[30]} value={squares[30]} onSquareClick={() => handleClick(30)}/>
            <Square className={colors[31]} value={squares[31]} onSquareClick={() => handleClick(31)}/>
            <Square className={colors[32]} value={squares[32]} onSquareClick={() => handleClick(32)}/>
            <Square className={colors[33]} value={squares[33]} onSquareClick={() => handleClick(33)}/>
            <Square className={colors[34]} value={squares[34]} onSquareClick={() => handleClick(34)}/>
        </div>
        <div className="board-row">
            <Square className={colors[35]} value={squares[35]} onSquareClick={() => handleClick(35)}/>
            <Square className={colors[36]} value={squares[36]} onSquareClick={() => handleClick(36)}/>
            <Square className={colors[37]} value={squares[37]} onSquareClick={() => handleClick(37)}/>
            <Square className={colors[38]} value={squares[38]} onSquareClick={() => handleClick(38)}/>
            <Square className={colors[39]} value={squares[39]} onSquareClick={() => handleClick(39)}/>
            <Square className={colors[40]} value={squares[40]} onSquareClick={() => handleClick(40)}/>
            <Square className={colors[41]} value={squares[41]} onSquareClick={() => handleClick(41)}/>
        </div>
        
    </>
    );
}

function calculateWinner(squares) {
    //USED LATER to check for diagonal winning scenarios
    const lines = [
      //columns 0 and 3 diagonals
      [0, 8, 16, 24],
      [7, 15, 23, 31],
      [14, 22, 30, 38],
      [21, 15, 9, 3],
      [28, 22, 16, 10],
      [35, 29, 23, 17],
      //columns 6 and 3 diagonals
      [6, 12, 18, 24],
      [13, 19, 25, 31],
      [20, 26, 32, 38],
      [27, 19, 11, 3],
      [34, 26, 18, 10],
      [41, 33, 25, 17],
      //columns 1 and 4 diagonals
      [1, 9, 17, 25],
      [8, 16, 24, 32],
      [15, 23, 31, 39],
      [22, 16, 10, 4],
      [29, 23, 17, 11],
      [36, 30, 24, 18],
      //columns 5 and 2 diagonals
      [5, 11, 17, 23],
      [12, 18, 24, 30],
      [19, 25, 31, 37],
      [26, 18, 10, 2],
      [33, 25, 17, 9],
      [40, 32, 24, 16]
    ];
    let hasBeenNull = false;
    //check for horizontal winning scenarios
    for (let i = 0; i < 42; i=i+7) {
        let count = 0;
        let currentVal = "";
        for (let j = i; j < (i+7); j++) {
            if (squares[j] === null) {
                //used for tie check
                hasBeenNull = true;
                currentVal = "";
                count = 0;
                continue;
            }
            else if (squares[j] === currentVal) {
                currentVal = squares[j];
                count = count + 1;
                if (count === 4) {
                    console.log("RETURNING IN HORIZONTAL");
                    return squares[j];
                }
            }
            else {
                count = 1;
                currentVal = squares[j];
            }
        }
    }

    //check for verticle winning scenarios
    for (let i = 0; i < 7; i++) {
        let count = 0;
        let currentVal = "";
        for (let j = i; j <= (35+i); j=j+7) {
            if (squares[j] === null) {
                //used for tie check
                hasBeenNull = true;
                currentVal = "";
                count = 0;
                continue;
            }
            else if (squares[j] === currentVal) {
                currentVal = squares[j];
                count = count + 1;
                if (count === 4) {
                    console.log("RETURNING IN VERTICAL");
                    return squares[j];
                }
            }
            else {
                count = 1;
                currentVal = squares[j];
            }
        }
    }

    //check for diagonal winning scenarios
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] != null && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        console.log("RETURNING IN DIAGONAL");
        return squares[a];
      }
      //check for tie 
      //if no wins(checked all three scenarios) and entire board is full(we are on the last square)
      if (!hasBeenNull && i === lines.length-1) {
        console.log("RETURNING IN TIE");
        return "T";
      }
    }
    return null;
  }