import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { checkWinner } from "./components/Winner"
import { PLAYER } from "./constants"
import { Winner } from "./components/Winner"
import { checkEndGame } from "./components/Winner"

function App() {
  const [board, setBoard] = useState( () => {
    const localStorageBoard = window.localStorage.getItem('board')
    return localStorageBoard ? JSON.parse(localStorageBoard) : Array(9).fill(null)
  }) 
    
  const [player, setPlayer] = useState( () => {
    const localStoragePlayer = window.localStorage.getItem('player')
    return localStoragePlayer ? localStoragePlayer : PLAYER.x
  })

  const [playerXwins, setPlayerXwins] = useState( () => {
    const localStorageXwins = window.localStorage.getItem('xWins')
    return localStorageXwins ? Number(localStorageXwins) : 0
  })
  const [playerOwins, setPlayerOwins] = useState( () => {
    const localStorageOwins = window.localStorage.getItem('oWins')
    return localStorageOwins ? Number(localStorageOwins) : 0
  })
  
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setPlayer(PLAYER.x)
    setWinner(null)
    setPlayerXwins(0)
    setPlayerOwins(0)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('player')
    window.localStorage.removeItem('xWins')
    window.localStorage.removeItem('oWins')
  }
  const tryAgain = () => {
    setBoard(Array(9).fill(null))
    setPlayer(PLAYER.x)
    setWinner(null)
  
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('player')
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = player
    setBoard(newBoard)
    const newPlayer = player === PLAYER.x ? PLAYER.o : PLAYER.x
    setPlayer(newPlayer)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('player', newPlayer)
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)

      if(player === PLAYER.x) {
        const countWinsX = Number(playerXwins) + 1
        setPlayerXwins(countWinsX)
        window.localStorage.setItem('xWins', Number(countWinsX))
      } else {
        const countWinsO = Number(playerOwins) + 1
        setPlayerOwins(countWinsO)
        window.localStorage.setItem('oWins', Number(countWinsO))
      }
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Ta Te Ti</h1>
      { <section className="board-visible">
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
      </section> }
      
      <section className="counter">
        <h2>Games won</h2>
        <div className="counter-box">
          <div>
            <Square>{PLAYER.x}</Square>
            <h3>{playerXwins}</h3>
          </div>
          <div>
            <Square>{PLAYER.o}</Square>
            <h3>{playerOwins}</h3>
          </div>
        </div>

      </section>

      <section className="player">
        <Square isTurns={player === PLAYER.x}>{PLAYER.x}</Square>
        <Square isTurns={player === PLAYER.o}>{PLAYER.o}</Square>
      </section>

      <button className="board-button" onClick={resetGame}> Reset game</button>

      <Winner tryAgain={tryAgain} winner={winner}/>
    </main>
  )
}

export default App
