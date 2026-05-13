import React from 'react';
import useAuth from '../../../hooks/useAuth';

const UserDashboardHome = () => {

    const { user } = useAuth()
    console.log(user)

    return (
        <div className='text-black'>
            <h3 className='text-4xl'>Welcome back <span className='text-[#b5e918] font-semibold'>{user?.displayName}</span></h3>
        </div>
    );
};

export default UserDashboardHome;