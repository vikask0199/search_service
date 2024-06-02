import { useState } from "react";
import { useCreateCategoryMutation, useGetAllCategoryQuery } from "../../features/categorySlice/categorySlice";

const Category = () => {
    const [categoryName, setCategoryName] = useState("")
    const [createCategory] = useCreateCategoryMutation()
    const getAllCategory = useGetAllCategoryQuery(undefined)

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (categoryName) {
            const response = await createCategory({
                name: categoryName
            })
            if (response?.data?.status === "success") {
                window.alert(response.data.message)
            } else {
                window.alert(response.data.message)
            }
        } else {
            window.alert("Please add a valid category name ")
        }
    }



    return (
        <div className="flex flex-col gap-5">
            <div className="h-14 flex items-center justify-center bg-green-600 rounded text-2xl font-bold text-white">Category</div>

            <div className="bg-white rounded px-2 flex flex-col">
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-">
                        <div className="w-full px-3 mb-6 md:mb-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Category Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="category" onChange={(e) => setCategoryName(e.target.value)} />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                    </div>

                    <button className="bg-blue-500 w-60 hover:bg-blue-600 text-white py-2 px-4 rounded my-2">
                        Submit
                    </button>
                </form>
                <div className="flex flex-col gap-2 py-2">
                    {
                        getAllCategory && getAllCategory?.data?.data?.length > 0 ? (
                            getAllCategory?.data?.data?.map((item: any, index: number) => (
                                <p key={index}><span className="font-bold pr-2">{index+1}</span>- {item.name}</p>
                            ))
                        ) : (
                            <p>No category Found</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Category