import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import GoogleLogin from '../../components/GoogleLogin';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const axiosSecure = useAxiosSecure();

    const { handleSubmit, register, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const handleLogin = (data) => {
        const { email, password } = data;
        setLoading(true);

        login(email, password)
            .then((result) => {
                axiosSecure.get(`/users/${result.user.email}/role`)
                    .then(res => {
                        const role = res.data.role || 'user';
                        const from = location.state;

                        const userOnlyPages = ['/send-parcel', '/beArider', '/dashboard/myParcels'];

                        const isRestricted = from &&
                            role !== 'user' &&
                            userOnlyPages.some(page => from.startsWith(page));

                        const destination = (from && !isRestricted) ? from : '/';
                        navigate(destination, { replace: true });
                    })
                    .catch(err => {
                        console.log(err);
                        setLoading(false);
                    });
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

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
                <div className="bg-white text-black rounded-2xl shadow-xl p-5 md:p-10">
                    <div className="flex flex-col items-center mb-6">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">Welcome Back</h2>
                    </div>

                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="you@example.com"
                            />
                            {errors.email?.type === 'required' && (
                                <p className='text-red-500 text-lg font-semibold'>Please add your email</p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">Password</label>
                            </div>
                            <div className="relative">
                                <input
                                    {...register('password', { required: true })}
                                    type={showPassword ? 'text' : 'password'}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="••••••••"
                                />
                                {errors.password?.type === 'required' && (
                                    <p className='text-red-500 text-lg font-semibold'>Please add your login password</p>
                                )}
                                <button
                                    type="button"
                                    className="absolute top-4 right-3 cursor-pointer bg-[#00B795] p-1 rounded-full text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#00B795] hover:scale-105 text-white md:text-xl font-bold py-3 rounded-xl transition duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <FiLoader className="animate-spin text-2xl" />
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    <div className="mt-4">
                        <p className='text-center font-semibold'>Or login with</p>
                        <GoogleLogin></GoogleLogin>
                    </div>

                    <div className="flex justify-center items-center gap-1.5 mt-4">
                        <p className="text-sm text-gray-700">Don't have an account?</p>
                        <Link
                            to="/register"
                            className="text-[#00B795] text-sm font-semibold hover:underline hover:scale-105 transition"
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