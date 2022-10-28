import { BoardActionTypes } from '../action-types/board';
import { ResetBoardAction, SetActiveModelAction, RemoveActiveModelAction, SetActiveModelPayload, MoveModelAction } from './../actions/board';


export const resetBoard = (): ResetBoardAction => {
    return {
        type: BoardActionTypes.RESET_BOARD
    }
}

export const moveModel = (payload: [number, number]): MoveModelAction => {
    return {
        type: BoardActionTypes.MOVE_MODEL,
        payload
    }
}

export const setActiveModel = (payload: SetActiveModelPayload): SetActiveModelAction => {
    return {
        type: BoardActionTypes.SET_ACTIVE_MODEL,
        payload
    }
}

export const removeActiveModel = (): RemoveActiveModelAction => {
    return {
        type: BoardActionTypes.REMOVE_ACTIVE_MODEL
    }
}

export const setCheck = (payload: {for: "white" | "black"}) => {
    return {
        type: BoardActionTypes.SET_CHECK,
        payload
    }
}

export const setMate = (payload: {for: "white" | "black"}) => {
    return {
        type: BoardActionTypes.SET_CHECK,
        payload
    }
}

export const removeCheck = () => {
    return {
        type: BoardActionTypes.REMOVE_CHECK
    }
}

export const removeMate = () => {
    return {
        type: BoardActionTypes.REMOVE_MATE
    }
}

export const changePlayer = () => {
    return {
        type: BoardActionTypes.CHENGE_PLAYER
    }
}