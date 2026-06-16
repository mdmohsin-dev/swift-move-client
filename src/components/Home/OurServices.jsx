import React from 'react';
import { FaBolt, FaBoxOpen, FaGlobeAsia, FaHandshake, FaUndoAlt } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import expressDelivery from "../../assets/expressDelivery.png"
import nationWide from "../../assets/nationWide.png"
import fullfillment from "../../assets/fulfillment.png"
import COD from "../../assets/cash-on-delivery.png"
import contract from "../../assets/contract.png"
import returnImg from "../../assets/return.png"

const services = [
    {
        id: 1,
        img:expressDelivery,
        title: 'Express  & Standard Delivery',
        desc: 'We deliver parcels within 24/72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4/6 hours from pick-up to drop-off.'

    },
    {
        id: 2,
        img:nationWide,
        title: 'Nationwide Delivery',
        desc: 'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.'

    },
    {
        id: 3,
        img:fullfillment,
        title: 'Fulfillment Solution',
        desc: 'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.'

    },
    {
        id: 4,
        img:COD,
        title: 'Cash on Home Delivery',
        desc: '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.'

    },
    {
        id: 5,
        img:contract,
        title: 'Corporate Service / Contract In Logistics',
        desc: 'Customized corporate services which includes warehouse and inventory management support.'

    },
    {
        id: 6,
        img:returnImg,
        title: 'Parcel Return',
        desc: 'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.'

    }
]
const OurServices = () => {

    return (
        <div className='lg:max-w-350 w-11/12 mx-auto mt-36'>
            <div className='text-center lg:w-8/12 w-full mx-auto'>
                <h3 className='text-4xl font-bold text-[#104a51]'>Our Services</h3>
                <p className='pt-5'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-6'>
                {services.map(service =>
                    <div key={service.id} className='bg-white flex flex-col gap-4 items-center p-7 text-center rounded-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200'>
                        { <img src={service.img} className='w-16' alt="" /> }
                        <h3 className='text-2xl font-bold text-[#03373D]'>{service.title}</h3>
                        <p>{service.desc}</p>
                    </div>
                )}
            </div>
        </div >
    );
};

export default OurServices;