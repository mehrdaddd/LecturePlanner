import * as actiontypes from "../actions/action-types"
import { l } from '../../utility/log-helper';


export const deafultReducer = (state = {}, action) => {
    switch (action.type) {
        case actiontypes.TEST_TYPE:
            return Object.assign({}, state, {
                id: action.payload.id,
                name: action.payload.name
            })
        case actiontypes.BEGIN_HTTP_REQ:
            l("start api call")
            return state
        case actiontypes.END_HTTP_REQ:
            l("end api call")
            return state
        default:
            return state;
    }
}