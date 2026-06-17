import { Link } from "react-router";
import riderImage from "../../assets/rider3.webp"
import vector from "../../assets/Vector.png"

const Banner = () => {
    return (
        <div className="w-11/12 lg:mt-16 mt-6 h-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-0 max-w-350 mx-auto">
            
            <div className="lg:w-1/2 flex flex-col md:items-start md:text-left lg:gap-8 gap-3 items-center text-center">
                <img src={vector} className="hidden md:flex" alt="" />
                <h3 className="xl:text-6xl text-4xl font-extrabold xl:leading-20 leading-14">We Make Sure Your <span className="text-[#00B795]">Parcel Arrives</span> On Time – No Fuss.</h3>
                <p className="font-medium">Track your parcels, make secure payments with confidence, and enjoy fast, safe, and hassle-free deliveries anywhere in the country.</p>
                <Link to="/beArider"
                className="btn hidden md:flex border border-[#00B795] bg-[#00B795] px-6 text-white transition-all duration-300 hover:bg-transparent hover:text-[#00B795]">Be A Rider</Link>
            </div>
            <img src={riderImage} className="xl:w-auto lg:w-100 md:w-80"  alt="" />
        </div>
    );
};

export default Banner;