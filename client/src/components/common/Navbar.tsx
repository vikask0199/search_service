import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

    return (
        <div className="w-full md:px-20 sticky top-0 left-0 z-50 shadow-lg h-16 flex items-center bg-white">
            <div className="flex items-center justify-between h-full w-full">
                <div className="h-full md:w-auto w-full justify-between flex z-50 shadow-lg md:shadow-none px-4 md:px-0 text-blue-700">
                    <Link to="/" className="h-full items-center justify-center flex font-extrabold text-3xl">
                        movenow.in
                    </Link>
                    <div className="h-full items-center justify-center flex font-extrabold text-3xl md:hidden">
                        {
                            isSidebarOpen ? (
                                <IoMdClose onClick={() => setIsSidebarOpen(false)} />
                            ) : (
                                <MdOutlineMenu onClick={() => setIsSidebarOpen(true)} />
                            )
                        }
                    </div>
                </div>
                <ul className="h-full items-center justify-center hidden md:flex gap-8 font-semibold">
                    <li>
                        <Link to="/" className="hover:text-cyan-600 cursor-pointer duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-cyan-600 cursor-pointer duration-300">
                            About US
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-cyan-600 cursor-pointer duration-300">
                            Contact US
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin" className="hover:text-cyan-600 cursor-pointer duration-300">
                            Admin
                        </Link>
                    </li>
                </ul>


                {/* mobile screen */}
                <ul className={`bg-white md:hidden fixed w-full top-0 bottom-0 py-16 pl-6  duration-500 ${isSidebarOpen ? "left-0" : "left-[-100%]"}`}>
                    <li className="my-4">
                        <Link to="/" onClick={() => setIsSidebarOpen(false)} className="hover:text-cyan-600 cursor-pointer duration-300 font-semibold ">Home</Link>
                    </li>
                    <li className="my-4">
                        <Link to="/" onClick={() => setIsSidebarOpen(false)} className="hover:text-cyan-600 cursor-pointer duration-300 font-semibold ">About US</Link>
                    </li>
                    <li className="my-4">
                        <Link to="/" onClick={() => setIsSidebarOpen(false)} className="hover:text-cyan-600 cursor-pointer duration-300 font-semibold ">Contact US</Link>
                    </li>
                    <li className="my-4">
                        <Link to="/admin" onClick={() => setIsSidebarOpen(false)} className="hover:text-cyan-600 cursor-pointer duration-300 font-semibold ">Admin</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar