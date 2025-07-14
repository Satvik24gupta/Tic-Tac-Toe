import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [turn, setTurn] = useState('X')
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])
  const [winner, setWinner] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [draw, setDraw] = useState(false)
  const [winningCell, setWinningCell] = useState([])

  const containingCell = (cell, winningCell)=>{
    return winningCell.some(c => c[0] == cell[0] && c[1] == cell[1])
  }

  const checkWin = (board) => {
    // Possible wins when these are same:
    const wins = [
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]]
    ]
    for(let i=0;i<wins.length;i++)
      {
      if(board[wins[i][0][0]][wins[i][0][1]] != ''){
        if (board[wins[i][0][0]][wins[i][0][1]] === board[wins[i][1][0]][wins[i][1][1]] && board[wins [i][1][0]][wins[i][1][1]] === board[wins[i][2][0]][wins[i][2][1]]){
          setWinningCell(wins[i])
          return board[wins[i][0][0]][wins[i][0][1]]
        }
      }
    }
    return null
  }

  const checkDraw = (board)=>{
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        if(board[i][j] === ''){
          return false
        }
      }
    }
    return true
  }

  const reset = ()=>{
    setBoard(
      [ 
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ]
    );
    setWinner(null);
    setGameOver(false);
    setDraw(false);
    setTurn('X');
    setWinningCell([])
  }


  const handleClick = (e, i, j)=>{
    if(e.target.innerText === '' && !gameOver){
      // e.target.innerText = turn
      const updatedBoard = board.map((row, rowIdx) =>
        row.map((cell, colIdx) =>
          rowIdx == i && colIdx == j ? turn : cell
      ))
      setBoard(updatedBoard)
      setTurn(turn === 'X' ? 'O' : 'X')
      const isWinner = checkWin(updatedBoard)
      if(isWinner){
        // setTimeout(() => {
        //   alert(`Player ${isWinner} wins!`)
        // }, 10);
        setWinner(isWinner)
        setGameOver(true)
        return;
      }
      if(checkDraw(updatedBoard)){
        // setTimeout(() => {
        //   alert('It\'s a draw!')
        //   }, 10);
          setGameOver(true)
          return;
        }
    }
  }
  
  return (
    <>
      {/* <h1 className='text-red-800 text-center font'>This is Tic Tac Toe</h1> */}
      {!gameOver && <h1 className='text-pink-400 text-center mt-16 font-bold text-3xl'>There is '{turn}' Turn</h1>}
      {gameOver && !winner && <h1 className='text-red-400 text-center mt-16 font-bold text-3xl'>Game Over</h1>}
      {winner && <h1 className='text-green-400 text-center mt-16 font-bold text-3xl'>{winner} Won</h1>}
      <div className='flex justify-center mt-2'>
        <button onClick={reset} className='border border-black p-1 rounded-lg'>Reset</button>
      </div>
      <div className='flex justify-center mt-20'>
        <div className='border-black min-w-96 bg-slate-600'>
          <div className='grid grid-cols-3 gap-2 h-full'>
            <div className={`flex cursor-pointer ${containingCell([0,0], winningCell) ? "bg-green-300" : "bg-white"} h-40 w-40 justify-center items-center text-6xl`} onClick={(e)=>handleClick(e, 0, 0)}>{board[0][0]}</div>
            <div className={`flex cursor-pointer ${containingCell([0,1], winningCell) ? "bg-green-300" : "bg-white"} h-40 w-40 justify-center items-center text-6xl`} onClick={(e)=>handleClick(e, 0, 1)}>{board[0][1]}</div>
            <div className={`flex cursor-pointer ${containingCell([0,2], winningCell) ? "bg-green-300" : "bg-white"} h-40 w-40 justify-center items-center text-6xl`} onClick={(e)=>handleClick(e, 0, 2)}>{board[0][2]}</div>
            <div className={`flex cursor-pointer ${containingCell([1,0], winningCell) ? "bg-green-300" : "bg-white"} h-40 w-40 justify-center items-center text-6xl`} onClick={(e)=>handleClick(e, 1, 0)}>{board[1][0]}</div>
            <div className={`flex cursor-pointer ${containingCell([1,1], winningCell) ? "bg-green-300" : "bg-white"} h-40 w-40 justify-center items-center text-6xl`} onClick={(e)=>handleClick(e, 1, 1)}>{board[1][1]}</div>
            <div className={`flex cursor-pointer ${containingCell([1,2], winningCell) ? "bg-green-300" : "bg-white"} h-40 w-40 justify-center items-center text-6xl`} onClick={(e)=>handleClick(e, 1, 2)}>{board[1][2]}</div>
            <div className={`flex cursor-pointer ${containingCell([2,0], winningCell) ? "bg-green-300" : "bg-white"} h-40 w-40 justify-center items-center text-6xl`} onClick={(e)=>handleClick(e, 2, 0)}>{board[2][0]}</div>
            <div className={`flex cursor-pointer ${containingCell([2,1], winningCell) ? "bg-green-300" : "bg-white"} h-40 w-40 justify-center items-center text-6xl`} onClick={(e)=>handleClick(e, 2, 1)}>{board[2][1]}</div>
            <div className={`flex cursor-pointer ${containingCell([2,2], winningCell) ? "bg-green-300" : "bg-white"} h-40 w-40 justify-center items-center text-6xl`} onClick={(e)=>handleClick(e, 2, 2)}>{board[2][2]}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
