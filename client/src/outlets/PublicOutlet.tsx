import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"

const PublicOutlet = () => {
    return (
        <>
            <Navbar />
            <div className="h-[91%]">
                <Outlet />
            </div>
        </>
    )
}

export default PublicOutlet