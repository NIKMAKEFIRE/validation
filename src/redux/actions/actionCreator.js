import { REGISTRATION } from "../constants";
import { CONFIRMATION } from "../constants";
import { LOGIN } from "../constants";

export const setRegistrationAC = (payload) => ({
    type: REGISTRATION, payload
})

export const setLoginAC = (payload) => ({
    type: LOGIN, payload
})

export const setConfirmAC = (payload) => ({
    type: CONFIRMATION, payload
})

