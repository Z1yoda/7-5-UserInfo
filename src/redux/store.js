import { combineReducers, createStore } from "redux";
import { totoReducer } from "./todoReducer";


const rootReducer = combineReducers({
    todos: totoReducer,
});

export const store = createStore(rootReducer);
