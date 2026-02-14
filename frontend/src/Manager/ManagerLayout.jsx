import { Outlet } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";

export default function ManagerLayout() {

    return (
        <div className="flex flex-col">
            <div className="flex w-screen">
                <ManagerSidebar />
                <Outlet />
            </div>
        </div>
    )
}