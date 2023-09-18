import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/navbar";

const LayoutUser = () => {
    return (
        <Navbar child={<Outlet />} />
    )
}

export default LayoutUser;