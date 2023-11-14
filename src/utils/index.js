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