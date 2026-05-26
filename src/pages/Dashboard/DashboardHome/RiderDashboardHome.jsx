import React from 'react';
import TodayDelivered from '../Rider/TodayDelivered';
import RiderTotalEarnings from '../Rider/RiderTotalEarnings';

const RiderDashboardHome = () => {
    return (
         <div className='text-black grid grid-cols-4 gap-4'>
            <TodayDelivered/>
            <RiderTotalEarnings/>
        </div>
    );
};

export default RiderDashboardHome;