import { motion } from 'framer-motion';
import {  useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import GoogleLogin from '../../components/GoogleLogin';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { handleSubmit, register } = useForm()

    const navigate = useNavigate()

    const onSubmit = (data) => {
        const { email, password } = data
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
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">Welcome Back</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4">
                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                               
                                Email
                            </label>
                            <input
                                type="email"
                                {...register('email')}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                                   
                                    Password
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute top-4 right-3 cursor-pointer bg-[#FF02CB] p-1 rounded-full text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-500 hover:bg-black hover:scale-105 text-white md:text-xl font-bold py-3 rounded-xl transition duration-300 cursor-pointer"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-4">
                        <p className='text-center font-semibold'>Or login with</p>
                        <GoogleLogin></GoogleLogin>
                    </div>

                    <div className="flex justify-center items-center gap-1.5 mt-4">
                        <p className="text-sm text-gray-700">Don’t have an account?</p>
                        <Link
                            to="/register"
                            className="text-[#FF02CB] text-sm font-medium hover:text-[#FF0000] hover:underline hover:scale-105 transition"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;