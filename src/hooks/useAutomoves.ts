import { useRef, useEffect, useState } from 'react';
import { ModelType } from './../types/model';
import { useActions } from './useActions';
import getModels from '../utils/getModels';
import { useTypedSelector } from './useTypedSelector';

export const useAutomoves = () => {
    const {activePlayer, positions, check, mate} = useTypedSelector(state => state.board)
    const [isAutomoving, setIsAutoMoving] = useState(false)
    const boardRef = useRef<HTMLDivElement>(null)

    const actions = useActions()

    const move = () => {
        let {white, black} = getModels(positions)

        white = white.filter(model => model.filterPossibleMoves(model.possibleMoves(positions), positions).length)
        black = black.filter(model => model.filterPossibleMoves(model.possibleMoves(positions), positions).length)

        let randomModel = {} as ModelType

        if (activePlayer === "white") {
            randomModel = white[Math.floor(Math.random() * white.length)]
        } else {
            randomModel = black[Math.floor(Math.random() * black.length)]
        }

        const modelPossibeMoves = randomModel.filterPossibleMoves(randomModel.possibleMoves(positions), positions)

        actions.board.setActiveModel({
            model: randomModel,
            possibleMoves: modelPossibeMoves
        })

        const randomPosition = modelPossibeMoves[Math.floor(Math.random() * modelPossibeMoves.length)]
        if (randomPosition) {
            actions.board.moveModel(randomPosition)
        }
    }

    useEffect(() => {
        if (mate) {
            setIsAutoMoving(false)
        }
    }, [mate])

    useEffect(() => {
        if (isAutomoving) {
            const interval = window.setInterval(move, 1000)
            return () => window.clearInterval(interval)
        }
    }, [activePlayer, positions, isAutomoving])

    useEffect(() => {
        if (boardRef.current) {
            boardRef.current.classList.toggle("board-blocked") 
        }
    }, [isAutomoving, boardRef])

    const start = () => {
        setIsAutoMoving(true)
    }

    const stop = () => {
        setIsAutoMoving(false)
    }

    return {start, boardRef, isAutomoving, stop}

}