import { BoardActionTypes } from '../action-types/board';
import { ResetBoardAction, SetPossibleMovesAction, ClearPossibleMovesAction } from './../actions/board';


export const resetBoard = (): ResetBoardAction => {
    return {
        type: BoardActionTypes.RESET_BOARD
    }
}

export const setPossibleMoves = (payload: [number, number][]): SetPossibleMovesAction => {
    return {
        type: BoardActionTypes.SET_POSSIBLE_MOVES,
        payload
    }
}

export const clearPossibleMoves = (): ClearPossibleMovesAction => {
    return {
        type: BoardActionTypes.CLEAR_POSSIBLE_MOVES
    }
}