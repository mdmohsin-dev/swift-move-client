import React from 'react';
import Banner from '../components/Home/Banner';
import Reviews from '../components/Home/Review/Reviews';
import HoWorks from '../components/Home/HoWorks';

const reviewsPromis = fetch("/reviews.json").then(res => res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HoWorks></HoWorks>
            <Reviews reviewsPromis={reviewsPromis}></Reviews>
        </div>
    );
};

export default Home;