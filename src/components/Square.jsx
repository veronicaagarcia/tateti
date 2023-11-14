
export const Square = ({children, isTurns, updateBoard, index}) => {
    const className = `square ${isTurns ? 'turn' : ''}`
  
    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
      <div 
      className={className}
      onClick={handleClick}
      >
        {children}
      </div>
    )
}