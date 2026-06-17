import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ReviewCard from './ReviewCard';


const Reviews = ({ reviewsPromis }) => {
    const reviews = use(reviewsPromis)
    return (
        <div className='max-w-350 w-11/12 mx-auto mt-40'>

            <div className='text-center lg:w-8/12 w-full mx-auto'>
                <h3 className='text-4xl text-[#104a51] font-bold'>What our customers are sayings</h3>
                <p className='pt-5'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>

            <div className='mt-16 relative'>
                {/* Left fade mask */}
                <div
                    className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }}
                />
                {/* Right fade mask */}
                <div
                    className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }}
                />

                <Swiper
                    // effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false
                    }}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    modules={[EffectCoverflow, Autoplay]}
                    className="mySwiper"
                >
                    {
                        reviews.map((review, index) => (
                            <SwiperSlide key={index}>
                                <ReviewCard review={review} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Reviews;