import { ModelType } from './../types/model';
import { BoardPositionsType } from './../types/board';
import King from '../models/King';

export default (type: string, positions: BoardPositionsType) => {
    let king = null as unknown as ModelType

    for (let row of positions) {
        for (let model of row) {
            if (model) {
                if (model instanceof King && model.type === type) {
                    king = model
                }
            }
        }
    }

    return king
}