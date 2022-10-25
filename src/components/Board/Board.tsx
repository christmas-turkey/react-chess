import React, {useEffect, useState} from 'react'
import cn from 'classnames'

import "./Board.css"
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { BoardRowType } from '../../types/board'
import Bishop from '../../models/Bishop'
import { useActions } from '../../hooks/useActions'
import { ModelType } from '../../types/model'


interface BoardRowProps {
  row: BoardRowType,
  rowIndex: number
}

interface BoardCellProps {
  model: ModelType | null,
  rowIndex: number, 
  colIndex: number
}

export const BoardRow: React.FC<React.HTMLAttributes<HTMLElement> & BoardRowProps> = ({row, rowIndex, ...props}) => {
  return (
    <div {...props} className={cn("board-row", props.className)}>
      <div className='board-coordinate'>{rowIndex + 1}</div>
      {row.map((cell, index) => (
        <BoardCell 
          rowIndex={rowIndex}
          colIndex={index}
          model={cell}
          className={((index + (rowIndex + 1) % 2) % 2 == 0) ? "green-cell" : "white-cell"} />
      ))}
    </div>
  )
}

export const BoardCell: React.FC<React.HTMLAttributes<HTMLElement> & BoardCellProps> = ({model, rowIndex, colIndex, ...props}) => {
  
  const {positions, possibleMoves} = useTypedSelector(state => state.board)
  const actions = useActions()

  const handleMouseOver = () => {
    if (model) {
      actions.board.setPossibleMoves(model.possibleMoves(positions))
    }
  }

  const handleMouseLeave = () => {
    actions.board.clearPossibleMoves()
  }
  
  return (
    <button onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} {...props} className={cn("board-cell", props.className, {
      "black-model": model && model.type === "white",
      "white-model": model && model.type === "black",
      "possible-move": possibleMoves.find(pos => pos[0] === rowIndex && pos[1] === colIndex)
    })}>
      {model && model.getModelName()}
    </button>
  )
}

export const Board: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {

  const {positions} = useTypedSelector(state => state.board)
  const actions = useActions()

  useEffect(() => {
    actions.board.resetBoard()
  }, [])

  return (
    <div {...props} className={cn("board", props.className)}>
      <div className='board-row'>
        {Array.from("abcdefgh").map((value) => <div className='board-coordinate'>{value}</div>)}
      </div>
      {positions.map((row, index) => {
        return <BoardRow row={row} rowIndex={index} />
      })}
    </div>
  )
}