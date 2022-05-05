import axios from "axios"

export const loginUser = (userObj) => (dispatch) => {
    axios.post('http://localhost:3000/login', userObj)
        .then(response => {
            console.log(response)
            dispatch({
                type: 'LOGIN',
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
}

export const registrationUser = (userObj) => (dispatch) => {
    axios.post('http://localhost:3000/', userObj)
        .then(response => {
            console.log(response)
            dispatch({
                type: 'REGISTRATION',
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
}

export const passwordChangeUser = (userObj) => (dispatch) => {
    axios.post('http://localhost:3000/password', userObj)
        .then(response => {
            console.log(response)
            dispatch({
                type: 'PASSWORD_CHANGE',
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
}



