import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import GoogleLogin from '../../components/GoogleLogin';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const QUICK_CREDENTIALS = {
    admin: {
        email: 'admin@gmail.com',
        password: 'Admin1',
    }
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeRole, setActiveRole] = useState(null);

    const axiosSecure = useAxiosSecure();

    const { handleSubmit, register, setValue, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();


    const handleQuickFill = (role) => {
        setActiveRole(role);
        setValue('email', QUICK_CREDENTIALS[role].email);
        setValue('password', QUICK_CREDENTIALS[role].password);
    };

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
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-2">
                            Welcome Back
                        </h2>
                    </div>

                    {/* ── Quick Fill Role Buttons ── */}
                    <div className="mb-5">
                        
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs font-semibold  whitespace-nowrap">
                                Login as
                            </span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>
                       
                        <div className="w-full">
                            <button
                                type="button"
                                onClick={() => handleQuickFill('admin')}
                                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 cursor-pointer
                                    ${activeRole === 'admin'
                                        ? 'bg-[#00B795] border-[#00B795] text-white scale-[1.02]'
                                        : 'border-[#00B795] text-[#00B795] hover:bg-[#00B795]/10'
                                    }`}
                            >
                                <MdAdminPanelSettings className="text-xl" />
                                Admin
                            </button>
                        </div>
                    </div>

                    {/* ── Login Form ── */}
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                        <div>
                            <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                placeholder="you@example.com"
                            />
                            {errors.email?.type === 'required' && (
                                <p className='text-red-500 text-lg font-semibold'>
                                    Please add your email
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label className="text-sm md:text-lg font-medium text-gray-700 flex items-center gap-2">
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    {...register('password', { required: true })}
                                    type={showPassword ? 'text' : 'password'}
                                    className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:bg-black text-black focus:text-white focus:outline-none focus:ring-2 focus:ring-[#FF02CB]"
                                    placeholder="••••••••"
                                />
                                {errors.password?.type === 'required' && (
                                    <p className='text-red-500 text-lg font-semibold'>
                                        Please add your login password
                                    </p>
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