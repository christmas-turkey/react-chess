import { BoardPositionsType } from './../types/board';
import { ModelType } from '../types/model';


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
    
    possibleMoves(positions: BoardPositionsType): [number, number][] {
        return [[0, 2]]
    }
}