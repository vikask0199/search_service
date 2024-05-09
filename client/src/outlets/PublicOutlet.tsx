import { Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar"

const PublicOutlet = () => {
    return (
        <>
            <div className="h-screen">
                <div className="h-[9%]">
                    <Navbar />
                </div>
                <div className="h-[91%]">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default PublicOutlet