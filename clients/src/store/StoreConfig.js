import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./Reducers/index.js";


const middleware = [thunk];
const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)))
export default store;
