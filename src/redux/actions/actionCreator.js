import { SET_USER_DATA } from "../constants";
import { SET_LOGIN_DATA } from "../constants";

export const setAuthUserDataAC = (payload) => ({
    type: SET_USER_DATA, payload
})

export const setLoginDataAC = (payload) => ({
    type: SET_LOGIN_DATA, payload
})
