import React from 'react';
import { FaBolt, FaBoxOpen, FaGlobeAsia, FaHandshake, FaUndoAlt } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

const services = [
    {
        id: 1,
        icon: <FaBolt size={40} color='#FA8492' />,
        title: 'Express  & Standard Delivery',
        desc: 'We deliver parcels within 24/72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4/6 hours from pick-up to drop-off.'

    },
    {
        id: 2,
        icon: <FaGlobeAsia size={38} color='green' />,
        title: 'Nationwide Delivery',
        desc: 'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.'

    },
    {
        id: 3,
        icon: <FaBoxOpen size={38} color='purple' />,
        title: 'Fulfillment Solution',
        desc: 'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.'

    },
    {
        id: 4,
        icon: <GiTakeMyMoney size={45} color='green' />,
        title: 'Cash on Home Delivery',
        desc: '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.'

    },
    {
        id: 5,
        icon: <FaHandshake size={42} color='#FFD641' />,
        title: 'Corporate Service / Contract In Logistics',
        desc: 'Customized corporate services which includes warehouse and inventory management support.'

    },
    {
        id: 6,
        icon: <FaUndoAlt size={35} color='red' />,
        title: 'Parcel Return',
        desc: 'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.'

    }
]
const OurServices = () => {

    return (
        <div className='lg:max-w-350 w-11/12 mx-auto mt-36'>
            <div className='text-center lg:w-8/12 w-11/12 mx-auto'>
                <h3 className='text-4xl font-bold text-[#104a51]'>Our Services</h3>
                <p className='pt-5'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6'>
                {services.map(service =>
                    <div key={service.id} className='bg-white flex flex-col gap-4 items-center p-7 text-center rounded-2xl hover:bg-[#CAEB66] transition-all duration-500'>
                        {service.icon}
                        <h3 className='text-2xl font-bold text-[#03373D]'>{service.title}</h3>
                        <p>{service.desc}</p>
                    </div>
                )}
            </div>
        </div >
    );
};

export default OurServices;