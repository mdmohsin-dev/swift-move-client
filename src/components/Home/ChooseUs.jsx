import React from 'react';
import trackingImg from "../../assets/liveTracking.png"
import vector from "../../assets/Vector.png"
import support from "../../assets/support.png"

const ChooseUs = () => {

    const chossesContent = [
        {
            id: 1,
            img: trackingImg,
            title: 'Live Parcel Tracking',
            desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
        },
        {
            id: 2,
            img: vector,
            title: '100% Safe Delivery',
            desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
        },
        {
            id: 3,
            img: support,
            title: '24/7 Call Center Support',
            desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
        }
    ]

    return (
        <div className='mt-40 max-w-350 w-11/12 mx-auto'>
            {
                chossesContent.map(choose => <div key={choose.id} className='bg-white rounded-2xl lg:p-9 p-7 flex flex-col md:flex-row items-center lg:gap-16 gap-10 md:h-72 h-full mt-6'>
                    <img src={choose.img} alt="" />
                    <div className='h-full hidden md:flex border border-dashed border-[#104a51]'></div>
                    <div>
                        <h3 className='text-2xl text-[#104a51] font-bold'>{choose.title}</h3>
                        <p className='pt-4'>{choose.desc}</p>
                    </div>
                </div>)
            }
        </div>
    );
};

export default ChooseUs;