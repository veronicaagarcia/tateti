import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { checkWinner } from "./utils"
import { PLAYER } from "./constants"
import { Winner } from "./components/Winner"

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [player, setPlayer] = useState(PLAYER.x)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setPlayer(PLAYER.x)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((Square) => Square !== null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = player
    setBoard(newBoard)
    const newPlayer = player === PLAYER.x ? PLAYER.o : PLAYER.x
    setPlayer(newPlayer)
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Te Te Ti</h1>
      <section className="board-visible">
        {
          board.map((square, index) => {
            return (
              <Square 
              key={index}
              index= {index}
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      
      <section className="player">
        <Square isTurns={player === PLAYER.x}>{PLAYER.x}</Square>
        <Square isTurns={player === PLAYER.o}>{PLAYER.o}</Square>
      </section>

      <button onClick={resetGame}> Reset game</button>

      <Winner resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
