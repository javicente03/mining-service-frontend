import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "../layout/layoutAdmin";
import LayoutUser from "../layout/layoutUser";
import NoRequireAuth from "../utils/noRequireAuth";
import RequireAdmin from "../utils/requireAdmin";
import RequireAuth from "../utils/requireAuth";
import { PageNotFound } from "../views/404/404PageNotFound";
import { CreateCompany } from "../views/admin/Companies/CreateCompany";
import { ListCompanies } from "../views/admin/Companies/ListCompanies";
import { UpdateCompany } from "../views/admin/Companies/UpdateCompany";
import { HomeAdmin } from "../views/admin/home";
import { AsignacionPresupuesto } from "../views/admin/OTs/AsignacionPresupuesto";
import { OTCreate } from "../views/admin/OTs/creacion/CreacionOt";
import { OTsListAdmin } from "../views/admin/OTs/ListOts";
import { SolicitudDetailAdmin } from "../views/admin/Solicitudes/SolicitudDetail";
import { SolicitudesListAdmin } from "../views/admin/Solicitudes/SolicitudesList";
import { CreateUser } from "../views/admin/Users/CreateUser";
import { ListUsers } from "../views/admin/Users/ListUsers";
import { UpdateUser } from "../views/admin/Users/UpdateUser";
import { ForgotPassword } from "../views/free/ForgotPassword";
import { Login } from "../views/free/login";
import { ResetPassword } from "../views/free/ResetPassword";
import { Home } from "../views/home";
import { ListOts } from "../views/OTs/ListOts";
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
            },
            {
                path: "/ots",
                element: <ListOts />,
            }
        ]
    },
    {
        path: "/",
        element: <RequireAdmin><LayoutAdmin /></RequireAdmin>,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/admin",
                element: <HomeAdmin />,
            },
            {
                path: "/admin/requests",
                element: <SolicitudesListAdmin />
            },
            {
                path: "/admin/requests/:id",
                element: <SolicitudDetailAdmin />
            },
            {
                path: "/admin/ots",
                element: <OTsListAdmin />
            },
            {
                path: "/admin/ots/budget/:id",
                element: <AsignacionPresupuesto />
            },
            {
                path: "/admin/ots/create",
                element: <OTCreate />
            },
            {
                path: "/admin/users",
                element: <ListUsers />
            },
            {
                path: "/admin/users/create",
                element: <CreateUser />
            },
            {
                path: "/admin/users/update/:id",
                element: <UpdateUser />
            },
            {
                path: "/admin/companies",
                element: <ListCompanies />
            },
            {
                path: "/admin/companies/create",
                element: <CreateCompany />
            },
            {
                path: "/admin/companies/update/:id",
                element: <UpdateCompany />
            }
        ]
    },
    {
        path: "*",
        element: <PageNotFound />,
    }
]);