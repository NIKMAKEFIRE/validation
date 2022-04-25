import { combineReducers } from "redux";
import registration from './registration'
import confirmation from './confirmation'
import login from './login'

const rootReducers = combineReducers({
    registration,
    confirmation,
    login
})

export default rootReducers

