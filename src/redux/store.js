import { combineReducers, createStore } from "redux";
import { userInfoReducer } from "./userInfoRedux";


const rootReducer = combineReducers({
    users: userInfoReducer
});

export const store = createStore(rootReducer);
