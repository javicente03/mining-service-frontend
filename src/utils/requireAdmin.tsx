import { Navigate } from "react-router-dom";
import { getUser } from "./getAuthService";

// @ts-ignore
const RequireAdmin = ({children}) => {

    const user = getUser();
    if (!user) {
    
        return <Navigate to="/login" />;
    
    } else {
        // Si el usuario es admin, lo redirigimos a la ruta /admin
        if (user.role === "user") {
            return <Navigate to="/" />;
        }

        return children;
    }
};

export default RequireAdmin;