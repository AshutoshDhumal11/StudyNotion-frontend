import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// authenticate users cannot access this routes

function OpenRoute({children}) {
    const {token} = useSelector((state) => state.auth);

    if(token === null) {
        return children
    }
    else {
        return <Navigate to="/dashboard/my-profile"/>
    }
}

export default OpenRoute;