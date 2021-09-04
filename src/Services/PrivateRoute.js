import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ path, ...props }) => {

    const { isLoggedIn } = useSelector(state => state.auth);
    return isLoggedIn ?
        <Route {...props} path={path} /> :
        <Navigate to="/login" state={{ from: path }} replace />
}