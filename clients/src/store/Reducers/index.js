import { combineReducers } from "react-redux";
import { registerReducer } from "./registerReducer";



export default combineReducers ({

    register:registerReducer 
});