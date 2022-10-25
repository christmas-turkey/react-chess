import { BoardPositionsType } from './../types/board';
import { ModelType } from '../types/model';


export default class Pawn implements ModelType {
    type: 'black' | 'white';
    currentPosition: [number, number];

    constructor(type: 'black' | 'white', currentPosition: [number, number]) {
        this.type = type
        this.currentPosition = currentPosition
    }
    
    getModelName(): string {
        return "П"
    }

    getInitialPositions(): [number, number][] {
        return new Array(8).fill(0).map((_, index) => [1, index])
    }
    
    possibleMoves(positions: BoardPositionsType): [number, number][] {
        const possibleMoves: [number, number][] = []

        const [currentPosX, currentPosY] = this.currentPosition
        
        if (this.type === "white") {
            possibleMoves.push([currentPosX+1, currentPosY])
        } else {
            possibleMoves.push([currentPosX-1, currentPosY])
        }

        return possibleMoves
    }
}