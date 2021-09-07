import { useSelector } from "react-redux";

export function useToken() {

    const { userToken } = useSelector(state => state.auth)


    return function (callback) {
        if (typeof callback == "function")
            return callback(userToken);
        throw Error("Requires a callback function")
    }
}