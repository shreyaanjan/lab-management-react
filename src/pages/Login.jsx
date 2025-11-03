import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContextProvider"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [input, setInput] = useState({ email: '', password: '' })
    const { user, handleLogin } = useContext(AuthContext)
    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let res = await handleLogin(input.email, input.password)
    }

    return (
        <div className="bg-[#f9fafb] height flex items-center justify-center py-14">
            <div className="w-full max-w-md bg-[#ffffff] rounded-2xl shadow-xl p-8 box-shadow">
                <h2 className="text-3xl font-bold text-center text-[#111827] mb-5 tracking-wide">
                    Welcome Back
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-semibold text-[#374151]">
                            Email Address
                        </label>
                        <input type="email" id="email" onChange={handleChange} value={input.email}
                            className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-semibold text-[#374151]"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={handleChange}
                            value={input.password}
                            className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-4 px-4 py-2 font-semibold main-btn"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-[#4b5563] mt-6">
                    Don’t have an account?{" "}
                    <a href="#" className="text-[#e81e28] font-medium hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login