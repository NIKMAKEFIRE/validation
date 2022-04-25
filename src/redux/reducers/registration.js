import { REGISTRATION } from "../constants"

let initialState = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    keyword: ''
}

const registration = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION: return { ...state, ...action.payload }

        default: return state
    }
}

export default registration