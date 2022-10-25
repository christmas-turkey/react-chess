import {bindActionCreators} from 'redux'
import {useDispatch} from 'react-redux'
import * as boardActions from "../store/action-creators/board" 


export const useActions = () => {
    const dispatch = useDispatch()

    return {
        board: bindActionCreators(boardActions, dispatch)
    }
}