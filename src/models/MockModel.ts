import { BoardPositionsType } from './../types/board';
import { ModelType } from '../types/model';


export default class MockModel implements ModelType {
    type: 'black' | 'white';
    currentPosition: [number, number];

    constructor(type: 'black' | 'white', currentPosition: [number, number]) {
        this.type = type
        this.currentPosition = currentPosition
    }
    
    getModelName(): string {
        return ""
    }

    getInitialPositions(): [number, number][] {
        return []
    }

    filterPossibleMoves(possibleMoves: [number, number][], positions: BoardPositionsType): [number, number][] {
        return []
    }
    
    possibleMoves(positions: BoardPositionsType): [number, number][] {
        return []
    }
}