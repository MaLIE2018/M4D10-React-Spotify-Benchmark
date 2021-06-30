import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import bigReducer from "../reducers/index.js"


const combineEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true, traceLimit: 25}) || compose
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(bigReducer, combineEnhancers(applyMiddleware(thunk)))


