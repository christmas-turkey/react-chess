import { BoardPositionsType } from './../types/board';
import { ModelType } from '../types/model';


export default class Rook implements ModelType {
    type: 'black' | 'white';
    currentPosition: [number, number];

    constructor(type: 'black' | 'white', currentPosition: [number, number]) {
        this.type = type
        this.currentPosition = currentPosition
    }

    getModelName(): string {
        return "Т"
    }

    getInitialPositions(): [number, number][] {
        return [[0, 0], [0, 7]]
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

        return possibleMoves
    }
}