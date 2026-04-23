import React from 'react';
import Banner from '../components/Home/Banner';
import Reviews from '../components/Home/Review/Reviews';

const reviewsPromis = fetch("/reviews.json").then(res => res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Reviews reviewsPromis={reviewsPromis}></Reviews>
        </div>
    );
};

export default Home;