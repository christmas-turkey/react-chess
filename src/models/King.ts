import { BoardPositionsType } from './../types/board';
import { ModelType } from '../types/model';
import getKing from '../utils/getKing';
import isCheck from '../utils/isCheck';
import placeModel from '../utils/placeModel';
import bKing from "../assets/b_king.png"
import wKing from "../assets/w_king.png"


export default class King implements ModelType {
    type: 'black' | 'white';
    currentPosition: [number, number];

    constructor(type: 'black' | 'white', currentPosition: [number, number]) {
        this.type = type
        this.currentPosition = currentPosition
    }
    
    getModelImage(): { black: string; white: string; } {
        return {
            black: bKing,
            white: wKing
        }
    }

    getInitialPositions(): [number, number][] {
        return [[0, 4]]
    }

    filterPossibleMoves(possibleMoves: [number, number][], positions: BoardPositionsType): [number, number][] {
        const king = getKing(this.type, positions)
        const newMoves: [number, number][] = []

        possibleMoves.forEach(possibleMove => {
            if (!isCheck(new King(this.type, possibleMove), placeModel(positions, new King(this.type, this.currentPosition), possibleMove))) {
                newMoves.push(possibleMove)
            }
        })

        return newMoves
    }

    
    possibleMoves(positions: BoardPositionsType): [number, number][] {
        const possibleMoves: [number, number][] = []
        const [currentPosX, currentPosY] = this.currentPosition

        const checkPosition = (x: number, y: number) => {      
            if (positions[x]) {
                const next = positions[x][y]
                if (next === null || (next && next.type !== this.type)) {
                    possibleMoves.push([x, y])
                }
            }
        }

        checkPosition(currentPosX+1, currentPosY+1)
        checkPosition(currentPosX-1, currentPosY-1)
        checkPosition(currentPosX+1, currentPosY-1)
        checkPosition(currentPosX-1, currentPosY+1)
        checkPosition(currentPosX, currentPosY+1)
        checkPosition(currentPosX, currentPosY-1)
        checkPosition(currentPosX+1, currentPosY)
        checkPosition(currentPosX-1, currentPosY)

        return possibleMoves
    }
}