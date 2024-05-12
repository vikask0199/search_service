import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/admin/AdminSidebar"

const AdminOutlet = () => {
    return (
        <div className="flex">
            <div className="w-[10%] md:w-[20%] ">
                <AdminSidebar />
            </div>
            <div className="w-[90%] md:w-[80%] h-screen p-2 border bg-gray-200 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminOutlet