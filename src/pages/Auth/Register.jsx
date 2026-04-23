import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import GoogleLogin from '../../components/GoogleLogin';

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

    const location = useLocation()
    const navigate = useNavigate()

    const { handleSubmit, register, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        const { name, email, password, confirmPassword, photo } = data
        console.log(data)

        const profileImage = data.photo[0]

        // inside ta registerAuthFuncito
        const formData = new FormData()
        formData.append('image', profileImage)
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
        axios.post(image_API_URL, formData)
            .then(res => {
                console.log(res.data.data.url)
            })
            
            navigate(location?.state || '/')
    }


    return (
        <div className="min-h-screen text-white flex items-center justify-center">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 10,
                    duration: 1.5,
                }}

                className="w-[90%] md:w-[70%] max-w-md"
            >
                <div className="bg-white text-black rounded-2xl shadow-xl p-10">
                    <div className="flex flex-col items-center mb-6">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 pt-4 font-exo">Create Account</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4">

                        {/* NAME */}
                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">Name
                            </label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="Your name"
                            />
                            {errors.name?.type === 'required' && (<p className='text-red-500 text-lg font-semibold'>Please enter your name</p>)}
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">Email
                            </label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="Your email"
                            />
                            {errors.email?.type === 'required' && (<p className='text-red-500 text-lg font-semibold'>Please enter your email</p>)}
                        </div>

                        {/* PHOTO */}
                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">Photo
                            </label>
                            <input type="file"
                                {...register('photo', { required: true })}
                                className="file-input w-full file-input-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF02CB]" placeholder='Your photo' />
                            {errors.photo?.type === 'required' && (<p className='text-red-500 text-lg font-semibold'>Please add your photo</p>)}
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <div className="flex justify-between items-center">
                                <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">Password
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/ })}
                                    type={showPassword ? 'text' : 'password'}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="••••••••"
                                />
                                {errors.password?.type === 'required' && (<p className='text-red-500 text-lg font-semibold'>Please enter your password</p>)}
                                {errors.password?.type === 'minLength' && (<p className='text-red-500 text-lg font-semibold'>Password must be 6 characters or longer</p>)}
                                {errors.password?.type === 'pattern' && (<p className='text-red-500 text-lg font-semibold'>Password must contain at least 1 uppercase, 1 lowercase, and 1 number</p>)}
                                <button
                                    type="button"
                                    className="absolute top-4 right-3 cursor-pointer bg-[#CAEB66] p-[6px] rounded-full text-black"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-4 bg-[#CAEB66] hover:scale-105 text-black md:text-xl font-bold py-3 rounded-xl transition duration-300 cursor-pointer">Sign Up</button>
                    </form>

                    <div className="mt-4">
                        <p className='text-center font-semibold'>Or sign up with</p>
                        <GoogleLogin></GoogleLogin>
                    </div>

                    <div className="flex justify-center items-center gap-1.5 mt-4">
                        <p className="text-sm text-gray-700">Already have an account?</p>
                        <Link
                            to="/login"
                            className="text-[#FF02CB] text-sm font-medium hover:text-[#CAEB66] hover:underline hover:scale-105 transition">Login
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;