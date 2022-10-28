import { BoardPositionsType } from './../types/board';
import { ModelType } from './../types/model';
import getModels from './getModels';

export default (king: ModelType, positions: BoardPositionsType): boolean => {
    const [kingPosX, kingPosY] = king.currentPosition

    const models: Array<ModelType> = getModels(positions)[king.type === "white" ? "black" : "white"]

    for (let m of models) {
        const posssibleMoves = m.possibleMoves(positions)
        for (let [x, y] of posssibleMoves) {
            if (kingPosX === x && kingPosY === y) return true
        }
    }

    return false
}