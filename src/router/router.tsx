import { createBrowserRouter } from "react-router-dom";
import LayoutUser from "../layout/layoutUser";
import NoRequireAuth from "../utils/noRequireAuth";
import RequireAuth from "../utils/requireAuth";
import { ForgotPassword } from "../views/free/ForgotPassword";
import { Login } from "../views/free/login";
import { ResetPassword } from "../views/free/ResetPassword";
import { Home } from "../views/home";
import { SolicitudCreate } from "../views/Solicitudes/SolicitudCreate";
import { SolicitudDetail } from "../views/Solicitudes/SolicitudDetail";
import { SolicitudesList } from "../views/Solicitudes/Solicitudes";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <NoRequireAuth><Login /></NoRequireAuth>,
        errorElement: <div>404</div>,
    },
    {
        path: "/forgot-password",
        element: <NoRequireAuth><ForgotPassword /></NoRequireAuth>
    },
    {
        path: "/reset-password/:token/:id",
        element: <NoRequireAuth><ResetPassword /></NoRequireAuth>
    },
    {
        path: "/",
        element: <RequireAuth><LayoutUser /></RequireAuth>,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/requests",
                element: <SolicitudesList />
            },
            {
                path: "/requests/:id",
                element: <SolicitudDetail />
            },
            {
                path: "/requests/create",
                element: <SolicitudCreate />,
            }
        ]
    }
]);