import axios from 'axios';

export const loginService = async (username, password) => {
    try {
        console.log("login service ran", username, password)
        const response = await axios.post("http://localhost:8000/login", {
            user: { username, password }
        })
        console.log("its coming here")
        return response;
    } catch (error) {
        console.log("error handled here", error.response)
        const err = error.response
        return err
    }
}

export const signupService = async (username, password, name, email) => {
    try {
        console.log("login service ran", username, password)
        const response = await axios.post("http://localhost:8000/signup", {
            data: { username, password, name, email }
        })
        console.log("its coming here")
        return response;
    } catch (error) {
        console.log("error handled here", error.message)
        const err = error.response
        return err
    }
}