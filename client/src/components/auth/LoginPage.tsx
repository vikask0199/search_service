import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/reduxHooks"
import { setUser } from "../../features/authSlice/authSlice"
import { useLoginUserMutation } from "../../features/authSlice/loginSlice"
import { toast } from "react-toastify"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginUser] = useLoginUserMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    const [isLogin, setIsLogin] = useState(false)

    const handleLogin = async (e: any) => {
        e.preventDefault()
        if (email && password) {
            setIsLogin(true)
            const response: any = await loginUser({ email: email, password: password })
            if (response?.data?.status === "success") {
                toast.success("Login successful")
                dispatch(setUser({ token: response.data.token, })),
                    navigate(state?.from?.pathname || '/dashboard')
            } else {
                setIsLogin(false)
                toast.info(response.data.message)
            }
        } else {
            setIsLogin(false)
            toast.error("Please fill in all fields")
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                /> */}
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block pl-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block pl-1 text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            {/* <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div> */}
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block pl-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {
                                isLogin ? (
                                    "Wait . . . "
                                ) : (
                                    "Sign in"
                                )
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage