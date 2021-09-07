import axios from 'axios';
import { apiEndPoint } from './Api';

export const loginService = async (username, password) => {
    try {
        const response = await axios.post(`${apiEndPoint()}/login`, {
            user: { username, password }
        })
        return response;
    } catch (error) {
        console.log("error handled here", error.response)
        const err = error.response
        return err
    }
}

export const signupService = async (username, password, name, email) => {
    try {
        const response = await axios.post(`${apiEndPoint()}/signup`, {
            data: { username, password, name, email }
        })
        return response;
    } catch (error) {
        console.log("error handled here", error.message)
        const err = error.response
        return err
    }
}