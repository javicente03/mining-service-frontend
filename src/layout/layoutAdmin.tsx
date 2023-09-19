import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/navbar/navbar_admin";

const LayoutAdmin = () => {
    return (
        <NavbarAdmin child={<Outlet />} />
    )
}

export default LayoutAdmin;