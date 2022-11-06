import { ModelType } from './../../types/model';
import { BoardAction, SetActiveModelPayload } from './../actions/board';
import { BoardPositionsType } from "../../types/board"
import { BoardActionTypes } from '../action-types/board';
import Pawn from '../../models/Pawn';
import Rook from '../../models/Rook';
import Knight from '../../models/Knight';
import Bishop from '../../models/Bishop';
import Queen from '../../models/Queen';
import King from '../../models/King';
import createPositions from '../../utils/createPositions';
import getKing from '../../utils/getKing';
import isCheck from '../../utils/isCheck';
import getModels from '../../utils/getModels';
import isMate from '../../utils/isMate';
import moveSound from "../../assets/move.mp3"

interface BoardStateType {
    positions: BoardPositionsType,
    activeModel: SetActiveModelPayload | null,
    blackModels: Array<ModelType>,
    whiteModels: Array<ModelType>,
    check: {for: "white" | "black"} | null,
    mate: {for: "white" | "black"} | null,
    activePlayer: "white" | "black"
}

const initialState: BoardStateType = {
    positions: createPositions(),
    activeModel: null,
    blackModels: [],
    whiteModels: [],
    check: null,
    mate: null,
    activePlayer: "white"
}

export default (state: BoardStateType = initialState, action: BoardAction): BoardStateType => {
    switch (action.type) {
        case BoardActionTypes.RESET_BOARD:
            const newPositions = createPositions()
            const models = [Rook, Knight, Bishop, Queen, King, Pawn]
            const blackModels: Array<ModelType> = []
            const whiteModels: Array<ModelType> = []

            models.forEach(m => {
                m.prototype.getInitialPositions().forEach(([posX, posY]) => {
                    const whiteModel = new m("black", [posX, posY])
                    const blackModel = new m("white", [7 - posX, posY])
                    whiteModels.push(whiteModel)
                    blackModels.push(blackModel)

                    newPositions[posX][posY] = whiteModel
                    newPositions[7 - posX][posY] = blackModel
                })
            })

            return {
                ...state, 
                positions: newPositions, 
                check: null,
                mate: null,
                activePlayer: "white"
            }
        
        case BoardActionTypes.SET_ACTIVE_MODEL:
            return {...state, activeModel: action.payload}
        
        case BoardActionTypes.REMOVE_ACTIVE_MODEL:
            return {...state, activeModel: null}
        
        case BoardActionTypes.MOVE_MODEL: {
            const [posX, posY] = action.payload
            const {model, possibleMoves} = state.activeModel || {}
            let blackModels: Array<ModelType> = [...state.blackModels]
            let whiteModels: Array<ModelType> = [...state.whiteModels]

            if (model && possibleMoves) {
                const [prevPosX, prevPosY] = model.currentPosition
                whiteModels.filter(m => m !== model)
                const nextModel = state.positions[posX][posY]

                if (nextModel) {
                    if (nextModel.type === "white") {
                        whiteModels = whiteModels.filter(m => m !== nextModel)
                    } else {
                        blackModels = blackModels.filter(m => m !== nextModel)
                    }
                }

                if (model instanceof Pawn && (posX === 7 || posX === 0)) {
                    const queen = new Queen(model.type, [posX, posY])
                    state.positions[posX][posY] = queen

                    if (model.type === "white") {
                        whiteModels.push(queen)
                        whiteModels = whiteModels.filter(m => m !== model)
                    } else {
                        blackModels.push(queen)
                        blackModels = blackModels.filter(m => m !== model)
                    }
                } else {
                    state.positions[posX][posY] = model
                } 

                state.positions[prevPosX][prevPosY] = null

                model.currentPosition = [posX, posY]
            }

            new Audio(moveSound).play()

            const {white, black} = getModels(state.positions)

            const checkForTheWhite = isCheck(getKing("white", state.positions), state.positions)
            const checkForTheBlack = isCheck(getKing("black", state.positions), state.positions)
        
            const mateForTheWhite = isMate(white, state.positions)
            const mateForTheBlack = isMate(black, state.positions)

            return {
                ...state, 
                positions: state.positions, 
                activeModel: null, 
                whiteModels: whiteModels, 
                blackModels: blackModels,
                activePlayer: state.activePlayer === "white" ? "black" : "white",
                check: (checkForTheBlack || checkForTheWhite) ? {for: checkForTheWhite ? "white" : "black"} : null,
                mate: (mateForTheBlack || mateForTheWhite) ? {for: mateForTheWhite ? "white" : "black"} : null,
            }
        }

        case BoardActionTypes.SET_CHECK:
            return {...state, check: action.payload}
        case BoardActionTypes.SET_MATE:
            return {...state, mate: action.payload}
        case BoardActionTypes.REMOVE_CHECK:
            return {...state, check: null}
        case BoardActionTypes.REMOVE_MATE:
            return {...state, mate: null}
        case BoardActionTypes.CHENGE_PLAYER:
            return {...state, activePlayer: state.activePlayer === "white" ? "black" : "white"}
        default:
            return state
    }
}