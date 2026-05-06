import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from "../../assets/courier-logo.png"
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/send-parcel">Send Parcel</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>
        <li><NavLink to="/beArider">Be a Rider</NavLink></li>
        <li><NavLink to="/dashboard/myParcels">My Parcels</NavLink></li>
    </>

    return (
        <div className='bg-black text-white max-w-350 w-11/12 mx-auto py-16 px-20 rounded-3xl flex flex-col justify-center items-center gap-10 text-center'>
            <div className='flex flex-col justify-center items-center'>
                <Link to="/" className="flex items-center gap-1">
                    <img src={logo} className="w-10" alt="" />
                    <h3 className="text-3xl font-bold">SwiftMove</h3>
                </Link>
                <p className='w-full lg:w-10/12 text-center pt-4 text-white/60'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className="flex gap-10 items-center">
                <ul className="lg:flex hidden gap-6 text-[17px] font-inter font-medium">
                    {navLinks}
                </ul>
            </div>
            <div className='flex gap-10'>
                <a href=""><FaFacebook size={35} color='#0091FF'></FaFacebook></a>
                <a href=""><FaLinkedin size={35} color='#0091FF'></FaLinkedin></a>
                <a href=""><FaYoutube size={35} color='red'></FaYoutube></a>
            </div>
<p className='pt-6 text-white/60'>© 2026 SwiftMove. All rights reserved.</p>
        </div>
    );
};

export default Footer;