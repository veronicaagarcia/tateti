import { Square } from "./Square"
import { WINNERWHEN } from "../constants"

export const checkWinner = (newBoard) => {
  for (const when of WINNERWHEN) {
    const [a, b, c] = when
    if(
      newBoard[a] &&
      newBoard[a] === newBoard[b] &&
      newBoard[a] === newBoard[c]
    ) {
      return newBoard[a]
    }
  }
  return null
}

export function Winner ({winner, tryAgain}) {

  if(winner === null) return null

  const winnerText = winner === false ? 'You have tied' : 'The winner is'

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button className="board-button" onClick={tryAgain}>
            Try again
          </button>
        </footer>
      </div>
    </section>
  )
}

export const checkEndGame = (newBoard) => {
  return newBoard.every((Square) => Square !== null)
}
