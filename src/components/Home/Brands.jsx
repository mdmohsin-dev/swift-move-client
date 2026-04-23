import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import amazon from "../../assets/brands/amazon.png"
import casio from "../../assets/brands/casio.png"
import moonstar from "../../assets/brands/moonstar.png"
import randstad from "../../assets/brands/randstad.png"
import star from "../../assets/brands/star.png"
import start_people from "../../assets/brands/start_people.png"
import { Autoplay } from 'swiper/modules';

import { motion } from "motion/react"

const brandsLogo = [amazon, casio, moonstar, randstad, star,]

const Brands = () => {
    return (
           <div className='max-w-350 mx-auto'>
             <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                loop={true}
                modules={[Autoplay]}
            >
                {
                    brandsLogo.map(brand => <SwiperSlide>
                        <img src={brand} alt="" />
                    </SwiperSlide>)
                }

            </Swiper>
           </div>
        // <div className='max-w-350 mx-auto overflow-hidden flex'>
        //     <motion.div
        //         initial={{ x: 0 }}
        //         animate={{ x: "-100%" }}
        //         transition={{ duration: 30,repeat:Infinity,ease:'linear' }}
        //         className='flex flex-shrink-0 border border-green-500'>
        //         {
        //             brandsLogo.map(brand =>
        //                 <img className='pr-32' src={brand} alt="" />
        //             )
        //         }
        //     </motion.div>
        //     <motion.div
        //         initial={{ x: 0 }}
        //         animate={{ x: "-100%" }}
        //         transition={{ duration: 30,repeat:Infinity,ease:'linear' }}
        //         className='flex flex-shrink-0 border border-red-500 ml-12'>
        //         {
        //             brandsLogo.map(brand =>
        //                 <img className='pr-32' src={brand} alt="" />
        //             )
        //         }
        //     </motion.div>
        // </div>
    );
};

export default Brands;