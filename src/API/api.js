import axios from "axios"

export const authAPI = {
    async registration(username, email, password1, password2, keyword) {
        return await axios.post(`http://188.166.119.86:8080/api/user/register/`, {
            username, email, password1, password2, keyword
        }).then(response => console.log(response))
    },
    async login(code, email) {
        return await axios.post(`http://188.166.119.86:8080/api/user/login/`, {
            code, email
        })
    },
    async prelogin(login, password) {
        return await axios.post(`http://188.166.119.86:8080/api/user/pre-login/`, {
            login, password
        })
    }
}