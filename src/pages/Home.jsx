import React from 'react';
import Banner from '../components/Home/Banner';
import Reviews from '../components/Home/Review/Reviews';
import HowWorks from '../components/Home/HowWorks';
import OurServices from '../components/Home/OurServices';
import ChooseUs from '../components/Home/ChooseUs';
import FAQ from '../components/Home/FAQ';

const reviewsPromis = fetch("/reviews.json").then(res => res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowWorks></HowWorks>
            <ChooseUs></ChooseUs>
            <OurServices></OurServices>
            <FAQ></FAQ>
            <Reviews reviewsPromis={reviewsPromis}></Reviews>
        </div>
    );
};

export default Home;