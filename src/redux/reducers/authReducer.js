import { EMAIL, PASSWORD, CONFIRM_PASSWORD, OLD_PASSWORD, LOGIN, REGISTRATION, PASSWORD_CHANGE } from "../constants/constants";

const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    oldPassword: '',
}

export const authReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case EMAIL:
            return { ...state, email: actions.payload };
        case PASSWORD:
            return { ...state, password: actions.payload };
        case CONFIRM_PASSWORD:
            return { ...state, confirmPassword: actions.payload };
        case OLD_PASSWORD:
            return { ...state, oldPassword: actions.payload };
        case LOGIN:
            const login = state.concat(actions.payload);
            return { ...state, login };
        case REGISTRATION:
            const registration = state.concat(actions.payload);
            return { ...state, registration };
        case PASSWORD_CHANGE:
            const changePassword = state.concat(actions.payload);
            return { ...state, changePassword };
        default:
            return state;
    }
}