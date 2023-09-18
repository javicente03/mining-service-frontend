import { Navigate } from "react-router-dom";
import { getUser } from "./getAuthService";

// @ts-ignore
const RequireAuth = ({children}) => {

    const user = getUser();
    if (!user) {
    
        return <Navigate to="/login" />;
    
    } else {
        return children;
    }
};

export default RequireAuth;