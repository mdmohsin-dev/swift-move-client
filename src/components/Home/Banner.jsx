import { Link } from "react-router";
import riderImage from "../../assets/rider3.png"
import vector from "../../assets/Vector.png"

const Banner = () => {
    return (
        <div className="min-h-[85vh] mt-8 h-full bg-white rounded-3xl flex flex-col-reverse lg:flex-row items-center justify-between gap-24 lg:gap-0 md:p-12 p-8 max-w-350 mx-auto">
            <div className="lg:w-1/2 flex flex-col items-start lg:gap-8 gap-3">
                <img src={vector} alt="" />
                <h3 className="xl:text-6xl md:text-5xl text-4xl font-extrabold md:leading-20 leading-14">We Make Sure Your <span className="text-[#CAEB66]">Parcel Arrives</span> On Time – No Fuss.</h3>
                <Link to="/beArider"
                className="btn bg-[#CAEB66] px-6 text-black">Be A Rider</Link>
            </div>
            <img src={riderImage} className="xl:w-auto lg:w-100 md:w-96" alt="" />
        </div>
    );
};

export default Banner;