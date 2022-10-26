import { BoardAction, SetActiveModelPayload } from './../actions/board';
import { BoardPositionsType } from "../../types/board"
import { BoardActionTypes } from '../action-types/board';
import Pawn from '../../models/Pawn';
import Rook from '../../models/Rook';
import Knight from '../../models/Knight';
import Bishop from '../../models/Bishop';
import Queen from '../../models/Queen';
import King from '../../models/King';

interface BoardStateType {
    positions: BoardPositionsType,
    activeModel: SetActiveModelPayload | null
}

const BOARD_SIZE = 8

const createPositions = (): BoardPositionsType => {
    const positions = []
    for (let i=0; i<BOARD_SIZE; i++) {
        const row = []
        for (let j=0; j<BOARD_SIZE; j++) {
            row.push(null)
        }
        positions.push(row)
    }
    return positions
}


const initialState: BoardStateType = {
    positions: createPositions(),
    activeModel: null
}

export default (state: BoardStateType = initialState, action: BoardAction): BoardStateType => {
    switch (action.type) {
        case BoardActionTypes.RESET_BOARD:
            const newPositions = createPositions()
            const models = [Rook, Knight, Bishop, Queen, King, Pawn]

            models.forEach(m => {
                m.prototype.getInitialPositions().forEach(([posX, posY]) => {
                    newPositions[posX][posY] = new m("white", [posX, posY])
                    newPositions[7 - posX][posY] = new m("black", [7 - posX, posY])
                })
            })

            return {...state, positions: newPositions}
        
        case BoardActionTypes.SET_ACTIVE_MODEL:
            return {...state, activeModel: action.payload}
        
        case BoardActionTypes.REMOVE_ACTIVE_MODEL:
            return {...state, activeModel: null}
        
        case BoardActionTypes.MOVE_MODEL:
            const [posX, posY] = action.payload

            if (state.activeModel) {
                const [prevPosX, prevPosY] = state.activeModel.model.currentPosition

                if (state.activeModel.model instanceof Pawn && (posX === 7 || posX === 0)) {
                    state.positions[posX][posY] = new Queen(state.activeModel.model.type, [posX, posY])
                } else {
                    state.positions[posX][posY] = state.activeModel.model
                } 

                state.positions[prevPosX][prevPosY] = null

                state.activeModel.model.currentPosition = [posX, posY]
            }

            return {positions: state.positions, activeModel: null}
            
        default:
            return state
    }
}