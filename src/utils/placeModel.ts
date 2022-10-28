import { ModelType } from './../types/model';
import { BoardPositionsType } from './../types/board';
import createPositions from './createPositions';


const deepClonePositions = (positions: BoardPositionsType): BoardPositionsType => {
    const newPositions = createPositions()

    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            const cell = positions[i][j]
            if (cell) {
                newPositions[i][j] = cell
            } else {
                newPositions[i][j] = null
            }
        }
    }

    return newPositions
}

export default (positions: BoardPositionsType, model: ModelType, modelPos: [number, number]): BoardPositionsType => {
    

    const newPositions = deepClonePositions(positions)
    const [posX, posY] = modelPos
    const [prevPosX, prevPosY] = model.currentPosition

    newPositions[posX][posY] = model
    newPositions[prevPosX][prevPosY] = null
    

    return newPositions
}