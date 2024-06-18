import { combineReducers } from "redux"
import chatMessageReducer from "./chatMessageReducer"

const rootReducer = combineReducers({
    conversation: chatMessageReducer
})

export default rootReducer