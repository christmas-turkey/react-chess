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
        return [[0, 2]]
    }
}