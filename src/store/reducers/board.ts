import { ModelType } from './../../types/model';
import { BoardAction } from './../actions/board';
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
    possibleMoves: [number, number][]
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
    possibleMoves: []
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

            return {positions: newPositions, possibleMoves: []}
        
        case BoardActionTypes.SET_POSSIBLE_MOVES:
            return {...state, possibleMoves: action.payload}
        
        case BoardActionTypes.CLEAR_POSSIBLE_MOVES:
            return {...state, possibleMoves: []}
            
        default:
            return state
    }
}