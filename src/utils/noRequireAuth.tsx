import { Navigate } from "react-router-dom";
import { getUser } from "./getAuthService";

// @ts-ignore
const NoRequireAuth = ({children}) => {

    if (getUser()) {
    
    return <Navigate to="/home" />;
    
    }

    return children
};

export default NoRequireAuth;