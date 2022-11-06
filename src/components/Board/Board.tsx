import React, {useEffect, useState} from 'react'
import cn from 'classnames'

import "./Board.css"
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { BoardRowType } from '../../types/board'
import Bishop from '../../models/Bishop'
import { useActions } from '../../hooks/useActions'
import { ModelType } from '../../types/model'
import getKing from '../../utils/getKing'
import isCheck from '../../utils/isCheck'
import isMate from '../../utils/isMate'
import getModels from '../../utils/getModels'
import { useAutomoves } from '../../hooks/useAutomoves'


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
  
  const {positions, activeModel, activePlayer} = useTypedSelector(state => state.board)
  const actions = useActions()

  const {start, boardRef} = useAutomoves()


  const isHighlighted = activeModel && activeModel.possibleMoves.find(pos => pos[0] === rowIndex && pos[1] === colIndex)

  const handleClcick = () => {
    if (model && !isHighlighted) {
      actions.board.setActiveModel({
        model,
        possibleMoves: model.filterPossibleMoves(model.possibleMoves(positions), positions)
      })
    }

    if (isHighlighted) {
      actions.board.moveModel([rowIndex, colIndex])
    }
  }
  
  return (
    <button onClick={handleClcick} {...props} className={cn("board-cell", props.className, {
      "black-model": model && model.type === "black",
      "white-model": model && model.type === "white",
      "possible-move": isHighlighted,
      "active-model": model && (activeModel && activeModel.model === model),
      "model-blocked": model && (model.type !== activePlayer && !isHighlighted)
    })}>
      <img src={model ? model.getModelImage()[model.type === "white" ? "white" : "black"] : ""} />
    </button>
  )
}

export const Board: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {

  const {positions, activePlayer, check, mate} = useTypedSelector(state => state.board)
  const actions = useActions()

  const {start, stop, boardRef, isAutomoving} = useAutomoves()

  useEffect(() => {
    actions.board.resetBoard()
  }, [])

  const handleAutoMove = () => {
    if (isAutomoving) {
      stop()
    } else {
      start()
    }
  }

  return (
    <div {...props} ref={boardRef} className={cn("board", props.className)}>
      <div className='center'>
        <div className='active-player'>Ходять {activePlayer === "white" ? "білі" : "чорні"}</div>
        {check && (
          <div className='check'>Шах для {check.for === "white" ? "білих" : "чорних"}</div>
        )}
        {mate && (
          <div className='mate'>Мат для {mate.for === "white" ? "білих" : "чорних"}</div>
        )}
      </div>
      <div className='board-row'>
        {Array.from("abcdefgh").map((value) => <div className='board-coordinate'>{value}</div>)}
      </div>
      {positions.map((row, index) => {
        return <BoardRow row={row} rowIndex={index} />
      })}
      <div className='center'>
        {mate && (
          <button onClick={actions.board.resetBoard} className='reset-game'>Почати заново</button>
        )}
        {!mate && (
          <button className='automove' onClick={handleAutoMove}>{isAutomoving ? "Виключити автоходи" : "Включити автоходи"}</button>
        )}
      </div>
    </div>
  )
}