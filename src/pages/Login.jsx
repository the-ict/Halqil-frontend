import Bg from "../assets/bg.jpg"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {
    loginStart, loginFailure, loginSuccess
} from "../redux/userSlice"

export default function Login() {
    const [rememberMe, setRememberMe] = useState(false)
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const dispatch = useDispatch()

    const {user} = useSelector(store => store.user)

    useEffect(() => {
        if(user) {
            window.location.replace("/")
        }
    }, [])


    const handleLogin = async () => {
        dispatch(loginStart())
        try {
            const res = await axios.post("/api/auth/signin", {
                username,
                password
            })
            dispatch(loginSuccess(res.data))
            if (res.data) {
                window.location.replace("/")
            }

        } catch (error) {
            dispatch(loginFailure())
            console.log(error)
        }
    }


    return (
        <div className='flex items-center justify-between'>
            <div className='px-30 font-inter flex flex-col gap-5'>
                <h3 className='font-bold text-2xl'>Hisobga kirish</h3>
                <p className='opacity-60'>Iltimos boshlash uchun malumotlaringizni kiriting!</p>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="username" placeholder='Username' className='p-2 rounded outline-blue-400 border-gray-500 border-2' />
                <div className='flex items-center justify-between border-2 border-gray-500 p-2 rounded'>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" placeholder='Parol' className='flex-1 outline-none' />
                    <i className="fa-solid fa-eye-slash cursor-pointer"></i>
                </div>
                <div className='flex items-center gap-3'>
                    <input type="checkbox" value={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                    <p>Eslab qol</p>
                </div>
                <button
                    onClick={handleLogin}
                    className='bg-blue-400 text-white hover:bg-blue-500 py-2 rounded transition outline-none border-none cursor-pointer'>O'tish</button>
                <div className='flex items-center gap-3'>
                    <span className='h-0.5 flex-1 bg-gray-800'></span>
                    <span>Yoki</span>
                    <span className='h-0.5 flex-1 bg-gray-800'></span>
                </div>
                <button
                    className='rounded p-2 border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition'>
                    Google bilan
                    <i className="ml-3 fa-brands fa-google"></i>
                </button>
                <div className='flex justify-center items-center gap-3'>
                    <p>Sizda akkaunt yoqmi ?</p><p className='underline text-blue-400 cursor-pointer'>
                        <a href="/register">Yaratish</a>
                    </p>
                </div>
            </div>
            <img className='w-1/2 h-[100vh] object-cover rounded-2xl' src={Bg} alt="background img" />
        </div>
    )
}
