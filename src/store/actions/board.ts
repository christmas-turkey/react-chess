import { ModelType } from './../../types/model';
import { BoardActionTypes } from "../action-types/board";

export interface ResetBoardAction {
    type: BoardActionTypes.RESET_BOARD
}

export interface MoveModelAction {
    type: BoardActionTypes.MOVE_MODEL,
    payload: [number, number]
}

export interface SetActiveModelPayload {
    model: ModelType,
    possibleMoves: [number, number][]
}

export interface SetActiveModelAction {
    type: BoardActionTypes.SET_ACTIVE_MODEL,
    payload: SetActiveModelPayload
}

export interface RemoveActiveModelAction {
    type: BoardActionTypes.REMOVE_ACTIVE_MODEL
}

export type BoardAction = ResetBoardAction | SetActiveModelAction | RemoveActiveModelAction | MoveModelAction