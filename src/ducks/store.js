import { createStore, applyMiddleware, combineReducers } from "redux";
import reducer from "./userReducer";
import postReducer from "./postReducer";
import promiseMiddleware from "redux-promise-middleware";

const reducers = combineReducers({ reducer, postReducer });

export default createStore(reducers, applyMiddleware(promiseMiddleware));
