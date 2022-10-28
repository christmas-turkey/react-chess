import { BoardPositionsType } from './../types/board';
import { ModelType } from '../types/model';
import getKing from '../utils/getKing';
import isCheck from '../utils/isCheck';
import placeModel from '../utils/placeModel';
import MockModel from './MockModel';


export default class Knight implements ModelType {
    type: 'black' | 'white';
    currentPosition: [number, number];

    constructor(type: 'black' | 'white', currentPosition: [number, number]) {
        this.type = type
        this.currentPosition = currentPosition
    }
    
    getModelName(): string {
        return "К"
    }

    getInitialPositions(): [number, number][] {
        return [[0, 1], [0, 6]]
    }
    
    filterPossibleMoves(possibleMoves: [number, number][], positions: BoardPositionsType): [number, number][] {
        const king = getKing(this.type, positions)
        const newMoves: [number, number][] = []

        possibleMoves.forEach(possibleMove => {
            if (!isCheck(king, placeModel(positions, this, possibleMove))) {
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

        checkPosition(currentPosX-2, currentPosY-1)
        checkPosition(currentPosX-2, currentPosY+1)
        checkPosition(currentPosX-1, currentPosY-2)
        checkPosition(currentPosX-1, currentPosY+2)
        checkPosition(currentPosX+2, currentPosY-1)
        checkPosition(currentPosX+2, currentPosY+1)
        checkPosition(currentPosX+1, currentPosY-2)
        checkPosition(currentPosX+1, currentPosY+2)
        
        return possibleMoves
    }
}