import { BoardPositionsType } from './../types/board';
import { ModelType } from '../types/model';
import getKing from '../utils/getKing';
import isCheck from '../utils/isCheck';
import placeModel from '../utils/placeModel';
import King from './King';
import bPawn from "../assets/b_pawn.png"
import wPawn from "../assets/w_pawn.png"


export default class Pawn implements ModelType {
    type: 'black' | 'white';
    currentPosition: [number, number];

    constructor(type: 'black' | 'white', currentPosition: [number, number]) {
        this.type = type
        this.currentPosition = currentPosition
    }
    
    getModelImage(): { black: string; white: string; } {
        return {
            black: bPawn,
            white: wPawn
        }
    }

    getInitialPositions(): [number, number][] {
        return new Array(8).fill(0).map((_, index) => [1, index])
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
                const nextTopLeft = positions[x]?.[y-1]
                const nextTopRight = positions[x]?.[y+1]

                if (nextTopLeft && nextTopLeft.type !== this.type) {
                    possibleMoves.push([x, y-1])
                }

                if (nextTopRight && nextTopRight.type !== this.type) {
                    possibleMoves.push([x, y+1])
                }

                if (next === null) {
                    possibleMoves.push([x, y])
                }
            }
        }

        if (this.type === "black") {
            checkPosition(currentPosX+1, currentPosY)
            if (currentPosX === 1 && (positions[currentPosX+1][currentPosY] === null) && (positions[currentPosX+2][currentPosY] === null)) {
                possibleMoves.push([currentPosX+2, currentPosY])
            }

        } else {
            checkPosition(currentPosX-1, currentPosY)
            if (currentPosX === 6 && (positions[currentPosX-1][currentPosY] === null) && (positions[currentPosX-2][currentPosY] === null)) {
                possibleMoves.push([currentPosX-2, currentPosY])
            }

        }

        return possibleMoves
    }
}