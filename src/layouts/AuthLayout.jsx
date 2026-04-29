import React from 'react';
import { Link, Outlet } from 'react-router';
import authImage from "../assets/authImage.png"
import logo from "../assets/courier-logo.png"

const AuthLayout = () => {
    return (
        <div className='h-screen px-6'>
            <div className='flex h-full'>
                <Link to="/" className="flex items-center gap-1 pt-5 absolute">
                    <img src={logo} className="w-10" alt="" />
                    <h3 className="text-black text-3xl font-bold">SwiftMove</h3>
                </Link>
                <div className='w-1/2'>
                <Outlet></Outlet>
                </div>
                <div className='w-1/2 bg-[#FAFDF0] flex justify-center items-center'>
                    <img src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;