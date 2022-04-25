import { CONFIRMATION } from "../constants";

let initialState = {
    code: '',
    email: ''
}

const confirmation = (state = initialState, action) => {
    switch (action.type) {
        case CONFIRMATION: return { ...state, ...action.payload }

        default: return state
    }
}

export default confirmation