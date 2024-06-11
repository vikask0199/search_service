import { AiFillDatabase } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaGlobe } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";



const AdminSidebar = () => {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const handleOpenDashboard = () => {
        navigate(`/admin`);
    };

    const handleAddNewAddress = () => {
        navigate(`/admin/add-new-details/1`);
    };

    const handleOpenUpdate = () => {
        navigate(`/admin/update-details/2`);
    };

    // const handleOpenAllAddress = () => {
    //     navigate(`/admin/all-store/3`);
    // };

    const handleDeleteStore = () => {
        navigate(`/admin/delete-store/4`);
    };

    const clearDatabase = () => {
        navigate(`/admin/clear-database/5`);
    };

    const handleOpenProfile = () => {
        navigate(`/admin/profile/6`);
    };

    const handleOpenCategory = () => {
        navigate(`/admin/category/8`);
    };




    return (
        <div className="h-screen flex flex-col">
            <div className="h-16 shadow-md">
                <Link to="/" className="h-full hidden items-center justify-center md:flex font-extrabold text-3xl text-blue-600 ">
                    YOUR LOGO
                </Link>
                <Link to="/" className="h-full md:hidden items-center justify-center flex font-extrabold text-3xl text-blue-600 ">
                    YL
                </Link>
            </div>

            <div className="flex-grow flex flex-col justify-between py-5">
                <div className="flex flex-col gap-4 items-center">
                    <button onClick={() => handleOpenDashboard()} className={`flex w-full items-center gap-2 py-2 px-2 shadow-md text-blue-600 hover:bg-gray-100 duration-300 ${id === undefined ? 'bg-gray-200' : ''}`}><FaGlobe /><span className="hidden md:block">Dashboard</span></button>
                    <button onClick={() => handleOpenCategory()} className={`flex w-full items-center gap-2 py-2 px-2 shadow-md text-green-600 hover:bg-gray-100 duration-300 ${Number(id) === 8 ? 'bg-gray-200' : ''}`}><IoMdAdd /><span className="hidden md:block">Categories</span></button>
                    <button onClick={() => handleAddNewAddress()} className={`flex w-full items-center gap-2 py-2 px-2 shadow-md text-green-600 hover:bg-gray-100 duration-300 ${Number(id) === 1 ? 'bg-gray-200' : ''}`}><IoMdAdd /><span className="hidden md:block">Add Details</span></button>
                    <button onClick={() => handleOpenUpdate()} className={`flex w-full items-center gap-2 py-2 px-2 shadow-md text-violet-600 hover:bg-gray-100 duration-300 ${Number(id) === 2 ? 'bg-gray-200' : ''}`}><MdEdit /><span className="hidden md:block">Update Details</span></button>
                    {/* <button onClick={() => handleOpenAllAddress()} className={`flex w-full items-center gap-2 py-2 px-2 shadow-md text-yellow-600 hover:bg-gray-100 duration-300 ${Number(id) === 3 ? 'bg-gray-200' : ''}`}><FaListUl /><span className="hidden md:block">All Details</span></button> */}
                    <button onClick={() => handleDeleteStore()} className={`flex w-full items-center gap-2 py-2 px-2 shadow-md text-orange-600 hover:bg-gray-100 duration-300 ${Number(id) === 4 ? 'bg-gray-200' : ''}`}><MdOutlineDeleteOutline /><span className="hidden md:block">Delete Store</span></button>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <button onClick={() => clearDatabase()} className={`flex w-full items-center gap-2 py-2 px-2 shadow-md text-red-600 hover:bg-gray-100 duration-300 ${Number(id) === 5 ? 'bg-gray-200' : ''}`}><AiFillDatabase /><span className="hidden md:block">Clear Database</span></button>
                    <button onClick={() => handleOpenProfile()} className={`flex w-full items-center gap-2 py-2 px-2 shadow-md text-blue-600 hover:bg-gray-100 duration-300 ${Number(id) === 6 ? 'bg-gray-200' : ''}`}><CgProfile /><span className="hidden md:block">Profile</span></button>
                    <button onClick={() => { localStorage.removeItem("token"), navigate("/") }} className="flex w-full items-center gap-2 py-2 px-2 shadow-md text-gray-600 hover:bg-gray-100 duration-300"><RiLogoutCircleRLine /><span className="hidden md:block">Logout</span></button>
                </div>
            </div>

            {/* <div className="flex-grow flex flex-col justify-between py-5">
                <div className="flex flex-col gap-4 items-center">
                    <button onClick={() => handleOpenDashboard()} className="flex md:w-[85%] items-center gap-2 py-1 px-2 shadow-md bg-blue-600 text-white hover:bg-blue-700 duration-300"><FaGlobe /><span className="hidden md:block">Dashboard</span></button>
                    <button onClick={() => handleAddNewAddress()} className="flex md:w-[85%] items-center gap-2 py-1 px-2 shadow-md bg-green-600 text-white hover:bg-green-700 duration-300"><IoMdAdd /><span className="hidden md:block">Add Details</span></button>
                    <button onClick={() => handleOpenUpdate()} className="flex md:w-[85%] items-center gap-2 py-1 px-2 shadow-md bg-violet-600 text-white hover:bg-violet-700 duration-300"><MdEdit /><span className="hidden md:block">Update Details</span></button>
                    <button onClick={() => handleOpenAllAddress()} className="flex md:w-[85%] items-center gap-2 py-1 px-2 shadow-md bg-yellow-600 text-white hover:bg-yellow-700 duration-300"><FaListUl /><span className="hidden md:block">All Details</span></button>
                    <button onClick={() => handledeleteStore()} className="flex md:w-[85%] items-center gap-2 py-1 px-2 shadow-md bg-orange-600 text-white hover:bg-Orage-700 duration-300"><MdOutlineDeleteOutline /><span className="hidden md:block">Delete Store</span></button>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <button onClick={() => clearDatabase()} className="flex md:w-[85%] items-center gap-2 py-1 px-2 shadow-md bg-red-600 text-white hover:bg-red-700 duration-300"><AiFillDatabase /><span className="hidden md:block">Clear Database</span></button>
                    <button onClick={() => handleOpenProfile()} className="flex md:w-[85%] items-center gap-2 py-1 px-2 shadow-md bg-blue-600 text-white hover:bg-blue-700 duration-300"><CgProfile /><span className="hidden md:block">Profile</span></button>
                    <button className="flex md:w-[85%] items-center gap-2 py-1 px-2 shadow-md bg-gray-600 text-white hover:bg-gray-700 duration-300"><RiLogoutCircleRLine /><span className="hidden md:block">Logout</span></button>
                </div>
            </div> */}
        </div>
    )
}

export default AdminSidebar