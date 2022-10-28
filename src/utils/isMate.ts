import { BoardPositionsType } from './../types/board';
import { ModelType } from "../types/model";

export default (models: Array<ModelType>, positions: BoardPositionsType): boolean => {
    for (let m of models) {
        if (m.filterPossibleMoves(m.possibleMoves(positions), positions).length) {
            return false
        }
    }

    return true
}