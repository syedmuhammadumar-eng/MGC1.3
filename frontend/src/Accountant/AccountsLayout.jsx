import { Outlet } from "react-router-dom";
import AccountsSidebar from "./AccountsSidebar";

export default function AccountsLayout() {

    return (
        <div className="flex flex-col">
            <div className="flex w-screen">
                <AccountsSidebar />
                <Outlet />
            </div>
        </div>
    )
}