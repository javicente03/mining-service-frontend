import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "../layout/layoutAdmin";
import LayoutUser from "../layout/layoutUser";
import NoRequireAuth from "../utils/noRequireAuth";
import RequireAdmin from "../utils/requireAdmin";
import RequireAuth from "../utils/requireAuth";
import { PageNotFound } from "../views/404/404PageNotFound";
import { CreateActivity } from "../views/admin/Activities/CreateActivity";
import { ListActivities } from "../views/admin/Activities/ListActivities";
import { UpdateActivity } from "../views/admin/Activities/UpdateActivity";
import { CreateCompany } from "../views/admin/Companies/CreateCompany";
import { ListCompanies } from "../views/admin/Companies/ListCompanies";
import { UpdateCompany } from "../views/admin/Companies/UpdateCompany";
import { HomeAdmin } from "../views/admin/home";
import { CreateInsumo } from "../views/admin/Insumos/CreateInsumo";
import { ListInsumos } from "../views/admin/Insumos/ListInsumos";
import { UpdateInsumo } from "../views/admin/Insumos/UpdateInsumo";
import { AsignacionPresupuesto } from "../views/admin/OTs/AsignacionPresupuesto";
import { CreateOtChild } from "../views/admin/OTs/children/CreateOTChild";
import { OTCreate } from "../views/admin/OTs/creacion/CreacionOt";
import { OTsListAdmin } from "../views/admin/OTs/ListOts";
import { OTSettings } from "../views/admin/OTs/OTSettings";
import { SolicitudDetailAdmin } from "../views/admin/Solicitudes/SolicitudDetail";
import { SolicitudesListAdmin } from "../views/admin/Solicitudes/SolicitudesList";
import { CreateUser } from "../views/admin/Users/CreateUser";
import { CreateUserV2 } from "../views/admin/Users/CreateUserV2";
import { ListUsers } from "../views/admin/Users/ListUsers";
import { UpdateUser } from "../views/admin/Users/UpdateUser";
import { UpdateUserV2 } from "../views/admin/Users/UpdateUserV2";
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
                path: "/admin/ots/setting/:id",
                element: <OTSettings />
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
                element: <CreateUserV2 />
            },
            {
                path: "/admin/users/create-v1",
                element: <CreateUser />
            },
            {
                path: "/admin/users/update/:id",
                element: <UpdateUserV2 />
            },
            {
                path: "/admin/users/update-v1/:id",
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
            },
            {
                path: "/admin/activities",
                element: <ListActivities />
            },
            {
                path: "/admin/activities/create",
                element: <CreateActivity />
            },
            {
                path: "/admin/activities/update/:id",
                element: <UpdateActivity />
            },
            {
                path: "/admin/insumos",
                element: <ListInsumos />
            },
            {
                path: "/admin/insumos/create",
                element: <CreateInsumo />
            },
            {
                path: "/admin/insumos/update/:id",
                element: <UpdateInsumo />
            },
            {
                path: "/admin/ots/:id/newbudget",
                element: <CreateOtChild />
            }
        ]
    },
    {
        path: "*",
        element: <PageNotFound />,
    }
]);