import { BoardPositionsType } from './../types/board';
import { ModelType } from '../types/model';
import getKing from '../utils/getKing';
import isCheck from '../utils/isCheck';
import placeModel from '../utils/placeModel';


export default class Queen implements ModelType {
    type: 'black' | 'white';
    currentPosition: [number, number];

    constructor(type: 'black' | 'white', currentPosition: [number, number]) {
        this.type = type
        this.currentPosition = currentPosition
    }
    
    getModelName(): string {
        return "Ф"
    }

    getInitialPositions(): [number, number][] {
        return [[0, 3]]
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

        for (let i=currentPosX-1; i >= 0; i--) {
            const next = positions[i][currentPosY]

            if (!(next && next.type === this.type)) {
                possibleMoves.push([i, currentPosY])
                if (next && next.type !== this.type) {
                    break
                }
            } else {
                break
            }
        }

        for (let i=currentPosX+1; i < 8; i++) {
            const next = positions[i][currentPosY]
            if (!(next && next.type === this.type)) {
                possibleMoves.push([i, currentPosY])
                if (next && next.type !== this.type) {
                    break
                }
            } else {
                break
            }
        }

        for (let i=currentPosY-1; i >= 0; i--) {
            const next = positions[currentPosX][i]
            if (!(next && next.type === this.type)) {
                possibleMoves.push([currentPosX, i])
                if (next && next.type !== this.type) {
                    break
                }
            } else {
                break
            }
        }

        for (let i=currentPosY+1; i < 8; i++) {
            const next = positions[currentPosX][i]
            if (!(next && next.type === this.type)) {
                possibleMoves.push([currentPosX, i])
                if (next && next.type !== this.type) {
                    break
                }
            } else {
                break
            }
        }

        for (let x=currentPosX-1, y=currentPosY-1; x >= 0 && y >= 0; x--, y--) {
            const next = positions[x][y]
            if (!(next && next.type === this.type)) {
                possibleMoves.push([x, y])
                if (next && next.type !== this.type) {
                    break
                }
            } else {
                break
            }
        }

        for (let x=currentPosX+1, y=currentPosY-1; x < 8 && y >= 0; x++, y--) {
            const next = positions[x][y]
            if (!(next && next.type === this.type)) {
                possibleMoves.push([x, y])
                if (next && next.type !== this.type) {
                    break
                }
            } else {
                break
            }
        }

        for (let x=currentPosX-1, y=currentPosY+1; x >= 0 && y < 8; x--, y++) {
            const next = positions[x][y]
            if (!(next && next.type === this.type)) {
                possibleMoves.push([x, y])
                if (next && next.type !== this.type) {
                    break
                }
            } else {
                break
            }
        }

        for (let x=currentPosX+1, y=currentPosY+1; x < 8 && y < 8; x++, y++) {
            const next = positions[x][y]
            if (!(next && next.type === this.type)) {
                possibleMoves.push([x, y])
                if (next && next.type !== this.type) {
                    break
                }
            } else {
                break
            }
        }

        return possibleMoves
    }
}