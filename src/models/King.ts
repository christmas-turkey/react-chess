import { BoardPositionsType } from './../types/board';
import { ModelType } from '../types/model';


export default class King implements ModelType {
    type: 'black' | 'white';
    currentPosition: [number, number];

    constructor(type: 'black' | 'white', currentPosition: [number, number]) {
        this.type = type
        this.currentPosition = currentPosition
    }
    
    getModelName(): string {
        return "Кр"
    }

    getInitialPositions(): [number, number][] {
        return [[0, 4]]
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