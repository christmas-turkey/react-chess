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

export interface SetCheckAction {
    type: BoardActionTypes.SET_CHECK,
    payload: {
        for: "white" | "black"
    }
}

export interface SetMateAction {
    type: BoardActionTypes.SET_MATE,
    payload: {
        for: "white" | "black"
    }
}

export interface RemoveCheckAction {
    type: BoardActionTypes.REMOVE_CHECK
}

export interface RemoveMateAction {
    type: BoardActionTypes.REMOVE_MATE
}

export interface ChangePlayerAction {
    type: BoardActionTypes.CHENGE_PLAYER
}

export type BoardAction = ResetBoardAction | SetActiveModelAction | 
                          RemoveActiveModelAction | MoveModelAction |
                          SetCheckAction | SetMateAction | RemoveCheckAction |
                          RemoveMateAction | ChangePlayerAction