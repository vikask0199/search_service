import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetAllCategoryQuery } from "../../features/categorySlice/categorySlice";
import { useLazyGetStoreByEmailQuery, useUpdateStoreDataMutation } from "../../features/storeSlice/storeSlice";
import UploadImage from "./UploadImage";

const UpdateDetails = () => {
    const getAllCategory = useGetAllCategoryQuery(undefined)
    const [updateStore] = useUpdateStoreDataMutation()
    const [ratingInput, setRatingInput] = useState('');
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        address: {
            city: '',
            state: '',
            zip: '',
        },
        completeAddress: '',
        phone: '',
        email: '',
        website: '',
        whatsApp: '',
        logo: uploadedImageUrl,
        rating: [],
        locationUrl: '',
        category: '',
    });

    const handleImageUrlChange = (imageUrl: string) => {
        setUploadedImageUrl(imageUrl);
    };

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            logo: uploadedImageUrl,
        }));
    }, [uploadedImageUrl])


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prevState: any) => ({
                ...prevState,
                [parent]: {
                    ...prevState[parent],
                    [child]: child === 'city' ? value.toLowerCase() : value,
                }
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: name === 'email' ? value.toLowerCase() : value,
            }));
        }
    };

    const handleRatingChange = (e: any) => {
        setRatingInput(e.target.value);
    };

    const addRating = () => {
        const ratingValue = parseInt(ratingInput, 10);
        if (!isNaN(ratingValue)) {
            setFormData((prevState: any) => ({
                ...prevState,
                rating: [...prevState.rating, ratingValue],
            }));
            setRatingInput('');
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true)
        if (formData.name && formData.address.city && formData.address.state && formData.address.zip && formData.completeAddress && formData.category && formData.email && formData.locationUrl && formData.phone && formData.logo && formData.rating.length > 0 && formData.whatsApp) {
            const response = await updateStore({
                email: formData.email,
                dataToUpdate: formData
            })
            if (response?.data?.status === "success") {
                setIsSubmitting(false)
                toast.success("Store updated successfully")
            } else {
                setIsSubmitting(false)
                toast.error(response?.error?.data?.message)
            }
        } else {
            toast.info("Please fill all fields")
            setIsSubmitting(false)
        }
    };

    const handleCategoryChange = (e: any) => {
        setFormData((prevState) => ({
            ...prevState,
            category: e.target.value,
        }));
    };



    //get store
    const [getStoreRes] = useLazyGetStoreByEmailQuery(undefined)
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isVerifyEmail, setIsVerifyEmail] = useState(false)

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
                    formData.name = response.data.data.name,
                        formData.address.city = response.data.data.address.city,
                        formData.address.state = response.data.data.address.state,
                        formData.address.zip = response.data.data.address.zip,
                        formData.completeAddress = response.data.data.completeAddress,
                        formData.phone = response.data.data.phone,
                        formData.email = response.data.data.email,
                        formData.website = response.data.data.website,
                        formData.whatsApp = response.data.data.whatsApp,
                        formData.logo = response.data.data.logo,
                        formData.rating = response.data.data.rating,
                        formData.locationUrl = response.data.data.locationUrl,
                        formData.category = response.data.data.category,

                        setIsVerifyEmail(false)
                    setMessage("Store verified successfully now you can update")
                }
            } else {
                setMessage("")
                toast.info("Please fill email")
                setIsVerifyEmail(false)
            }
        } catch (error) {
            setMessage("")
            setIsVerifyEmail(false)
            toast.error("Something went wrong or email not found")
        }
    }


    return (
        <div className="flex flex-col gap-5">
            <div className="h-14 flex items-center justify-center bg-green-600 rounded text-2xl font-bold text-white">Update details</div>
            <div className="bg-white rounded px-2 flex flex-col gap-2">
                <p>
                    Please provide an email for the store. If a store is found, you can update its details, but remember, the store's email cannot be updated.
                </p>
                <div className="flex flex-col gap-2">
                    <form className="w-full">
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Enter Email Here
                                </label>
                                <input onChange={(e) => setEmail(e.target.value)} className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="example store `} />
                                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                                <p className="text-green-500 text-xs italic">{message}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-40 px-3 mb-6 md:mb-0">
                                <button onClick={(e) => getStore(e)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full my-2">
                                    {
                                        isVerifyEmail ? "Verifying . . . " : "Check Store"

                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                </div >
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3 mb-6 md:mb-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Store Name
                            </label>
                            <input name="name" value={formData.name} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter your store name" />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Complete Address
                            </label>
                            <input name="completeAddress" value={formData.completeAddress} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter complete address here" />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Mobile Number
                            </label>
                            <input name="phone" value={formData.phone} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter mobile number here " />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                City
                            </label>
                            <input name="address.city" value={formData.address.city} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter city name" />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                State
                            </label>
                            <input name="address.state" value={formData.address.state} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter state name" />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Zip Code
                            </label>
                            <input name="address.zip" value={formData.address.zip} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter zip code here" />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Email for inquary
                            </label>
                            <input name="email" value={formData.email} onChange={handleChange} readOnly className="cursor-not-allowed appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="xyz@example.com" />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Location
                            </label>
                            <input name="locationUrl" value={formData.locationUrl} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="XYZ sector-66, Noida, India" />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Category
                            </label>
                            <div className="relative">
                                <select name="category" value={formData.category} onChange={handleCategoryChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option value="">Select a category</option>
                                    {
                                        getAllCategory && getAllCategory?.data?.data?.length > 0 ? (
                                            getAllCategory?.data?.data?.map((item: any) => (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            ))
                                        ) : (
                                            <option>No category found</option>
                                        )
                                    }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Website link
                            </label>
                            <input name="website" value={formData.website} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="www.xyz.com/org/in" />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Whatsapp
                            </label>
                            <input name="whatsApp" value={formData.whatsApp} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="+91 XXXXXXXXXX" />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Rating
                            </label>
                            <input type="text" value={ratingInput} onChange={handleRatingChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" placeholder="Example- 2,8,4,1,6" />
                            <button type="button" onClick={addRating} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full my-2">
                                Add Rating
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Upload an Image
                            </label>
                            <UploadImage onImageUrlChange={handleImageUrlChange} />
                        </div>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full my-2">
                        {
                            isSubmitting ? "Wait . . ." : "Submit"
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateDetails