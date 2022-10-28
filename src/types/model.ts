import { BoardPositionsType } from './board';
export interface ModelType {
    type: "black" | "white"
    currentPosition: [number, number]
    getModelName: () => string,
    getInitialPositions: () => [number, number][]
    possibleMoves: (positions: BoardPositionsType) => [number, number][]
    filterPossibleMoves: (possibleMoves: [number, number][], positions: BoardPositionsType) => [number, number][]
}