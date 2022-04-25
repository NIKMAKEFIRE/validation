import { LOGIN } from "../constants";

let initialState = {
    login: '',
    password1: ''
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: return { ...state, ...action.payload }

        default: return state
    }
}

export default login