import { Square } from "./Square"

export function Winner ({winner, resetGame}) {

    if(winner === null) return null

    const winnerText = winner === false ? 'You have tied' : 'The winner is'

    return (
      <section className="winner">
        <div className="text">
          <h2>{winnerText}
          </h2>
          <header className="win">
            {winner && <Square>{winner}</Square>}
          </header>

          <footer>
            <button
              className="board-button"
              onClick={resetGame}
            >
              Try again
            </button>
          </footer>
        </div>
      </section>
    )
}