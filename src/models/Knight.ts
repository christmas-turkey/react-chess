import { BoardPositionsType } from './../types/board';
import { ModelType } from '../types/model';


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
    
    possibleMoves(positions: BoardPositionsType): [number, number][] {
        return [[0, 2]]
    }
}