import React from 'react';
import TodayDelivered from '../Rider/TodayDelivered';
import RiderTotalEarnings from '../Rider/RiderTotalEarnings';

const RiderDashboardHome = () => {
    return (
         <div className='text-black'>
            <TodayDelivered/>
            <RiderTotalEarnings/>
        </div>
    );
};

export default RiderDashboardHome;