import { BoardPositionsType } from './../types/board';
import { ModelType } from '../types/model';


export default class Bishop implements ModelType {
    type: 'black' | 'white'
    currentPosition: [number, number];

    constructor(type: 'black' | 'white', currentPosition: [number, number]) {
        this.type = type
        this.currentPosition = currentPosition
    }

    getModelName(): string {
        return "С"
    }

    getInitialPositions(): [number, number][] {
        return [[0, 2], [0, 5]]
    }

    possibleMoves(positions: BoardPositionsType): [number, number][] {
        const possibleMoves: [number, number][] = []
        const [currentPosX, currentPosY] = this.currentPosition

        console.log(positions)
        
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