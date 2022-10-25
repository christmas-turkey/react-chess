import { BoardActionTypes } from "../action-types/board";

export interface ResetBoardAction {
    type: BoardActionTypes.RESET_BOARD
}

export interface SetPossibleMovesAction {
    type: BoardActionTypes.SET_POSSIBLE_MOVES,
    payload: [number, number][]
}

export interface ClearPossibleMovesAction {
    type: BoardActionTypes.CLEAR_POSSIBLE_MOVES
}

export type BoardAction = ResetBoardAction | SetPossibleMovesAction | ClearPossibleMovesAction