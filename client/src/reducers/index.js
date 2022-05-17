import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools } from 'redux-devtools-extension'
import userReducer from "./userReducer";
import boardsReducer from "./boardsReducer";
import cardsReducer from "./cardsReducer";

const rootReducer = combineReducers({
    user: userReducer,
    boards: boardsReducer,
    cards: cardsReducer
})


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))