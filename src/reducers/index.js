import { combineReducers } from "redux";
import productReducer from "./product";

const appReducers = combineReducers({
    products:productReducer
});

export default appReducers;
