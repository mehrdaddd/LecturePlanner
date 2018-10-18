
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import * as reducers from './reducers/reducers'
import * as actions from './actions/actions'
import { l } from '../utility/log-helper'
import thunk from 'redux-thunk'
import { loginReducer } from './reducers/login-reducer';


const enhancer = compose(applyMiddleware(thunk)
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

let token = ''
if(localStorage.getItem('token'))
    token = localStorage.getItem('token')

export const store = createStore(combineReducers({
    profile: loginReducer,
    test: reducers.deafultReducer
}), {
    profile: {
        token: token,
        courses: [],
        locations: []
    }
}, enhancer)

export const test = (store) => {
    store.dispatch(actions.test({
        id: 1,
        name: "asdfasdfad"
    }))

    store.dispatch(actions.test({
        id: 2,
        name: "asdfasdfad"
    }))

    l(store.getState())

}