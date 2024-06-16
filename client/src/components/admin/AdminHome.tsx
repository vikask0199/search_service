import { useGetCountQuery } from "../../features/categorySlice/categorySlice"
import { useGetAllStoresCountQuery } from "../../features/storeSlice/storeSlice"




const AdminHome = () => {

    const  getTotalCategory  = useGetCountQuery(undefined)
    const  getAllStores  = useGetAllStoresCountQuery(undefined)

    return (
        <div className="flex flex-col gap-5">
            <div className="h-14 flex items-center justify-center bg-blue-600 text-white rounded text-2xl font-bold w-full">Dashboard</div>
            <div className="flex justify-between">
                <div className="box-content w-32 p-4 border-4 bg-white rounded-lg shadow-sm">
                    Category:- {getTotalCategory?.data?.data}
                </div>
                <div className="box-content w-32 p-4 border-4 bg-white rounded-lg shadow-sm">
                    Stores:-{getAllStores?.data?.data}
                </div>
            </div>
        </div>
    )
}

export default AdminHome