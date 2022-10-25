import {ModelType} from "./model"

export type BoardCellType = ModelType | null
export type BoardRowType = Array<BoardCellType>
export type BoardPositionsType = Array<BoardRowType>