import { ModelType } from './../types/model';
import { BoardPositionsType } from "../types/board";

interface GetModelType {
    black: Array<ModelType>,
    white: Array<ModelType>
}

export default (positions: BoardPositionsType): GetModelType => {
    const black: Array<ModelType> = []
    const white: Array<ModelType> = []

    for (let row of positions) {
        for (let model of row) {
            if (model) {
                if (model.type === "white") {
                    white.push(model)
                } else {
                    black.push(model)
                }
            }
        }
    }

    return {black, white}

}