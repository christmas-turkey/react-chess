import {combineReducers} from 'redux'
import board from './board'

const reducers = combineReducers({board})

export type RootState = ReturnType<typeof reducers>
export default reducers