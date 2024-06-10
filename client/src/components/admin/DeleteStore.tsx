import { useState } from "react"
import { useLazyDeleteStoreByEmailQuery, useLazyGetStoreByEmailQuery } from "../../features/storeSlice/storeSlice"
import { toast } from "react-toastify"

const DeleteStore = () => {
    const [getStoreRes] = useLazyGetStoreByEmailQuery(undefined)
    const [deleteStore] = useLazyDeleteStoreByEmailQuery(undefined)
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isEmailFound, setIsEmailFound] = useState(false)
    const [isVerifyEmail, setIsVerifyEmail] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const getStore = async (e: any) => {
        e.preventDefault()
        try {
            setIsVerifyEmail(true)
            if (email) {
                const data = {
                    sendEmail: email.toLowerCase()
                }
                const response = await getStoreRes({
                    ...data
                })
                if (response.data.status === 'success') {
                    setIsVerifyEmail(false)
                    setIsEmailFound(true)
                    setMessage("Store verified successfully now you can delete")
                }
            } else {
                setMessage("")
                setIsEmailFound(false)
                toast.info("Please fill email")
                setIsVerifyEmail(false)
            }
        } catch (error) {
            setMessage("")
            setIsVerifyEmail(false)
            setIsEmailFound(false)
            toast.error("Something went wrong or email not found")
        }
    }

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            if (email && isEmailFound) {
                const data = {
                    sendEmail: email.toLowerCase()
                }
                const response = await deleteStore({
                    ...data
                })
                if (response.data.status === 'success') {
                    toast.success("Store deleted successfully")
                    setIsEmailFound(true)
                    setIsDeleting(false)
                    setMessage("")
                }
            } else {
                setIsDeleting(false)
                toast.info("Please fill email or verify email")
            }
        } catch (error) {
            setIsDeleting(false)
            setMessage("")
            setIsEmailFound(false)
            toast.error("Something went wrong or email not found")
        }
    }




    return (
        <div className="flex flex-col gap-5">
            <div className="h-14 flex items-center justify-center bg-orange-600 rounded text-2xl font-bold text-white">Delete Store</div>
            <div className="bg-white rounded px-2 flex flex-col gap-5">
                <p>
                    Enter your email to delete store. If email verified then you can delete the store.
                </p>

                <form className="w-full">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Enter Email Here
                            </label>
                            <input onChange={(e) => setEmail(e.target.value)} className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="example store `} />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                            <p className="text-green-500 text-xs italic">{message}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <button onClick={(e) => getStore(e)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full my-2">
                                {
                                    isVerifyEmail ? "Verifying . . . " : "Check Store For Delete Process"

                                }
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <button onClick={handleDelete} className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full my-2 ${isEmailFound ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"}`}>
                                {
                                    isDeleting ? "Deleting . . ." : "Delete Store"
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default DeleteStore