import React from 'react';
import { Link, Outlet } from 'react-router';
import authImage from "../assets/authImage.png"
import logo from "../assets/courier-logo.png"
import nameLogo from "../assets/MoveFastLogo.png"

const AuthLayout = () => {
    return (
        <div className='h-screen'>
            <div className='flex flex-col lg:flex-row h-full'>
                <Link to="/" className="flex items-center gap-1 p-5 absolute">
                    <img src={logo} className="w-10" alt="" />
                    <img src={nameLogo} className="w-32" alt="" />
                </Link>
                <div className='w-full'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;