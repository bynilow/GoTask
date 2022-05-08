import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools } from 'redux-devtools-extension'
import userReducer from "./userReducer";
import boardsReducer from "./boardsReducer";

const rootReducer = combineReducers({
    user: userReducer,
    boards: boardsReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))