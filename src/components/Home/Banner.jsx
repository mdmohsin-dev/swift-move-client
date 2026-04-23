import { Link } from "react-router";
import riderImage from "../../assets/rider3.png"
import vector from "../../assets/Vector.png"

const Banner = () => {
    return (
        <div className="min-h-[85vh] mt-8 h-full bg-white rounded-3xl flex items-center justify-between px-12 max-w-350 mx-auto">
            <div className="w-1/2 flex flex-col items-start gap-8">
                <img src={vector} alt="" />
                <h3 className="text-6xl font-extrabold leading-20">We Make Sure Your <span className="text-[#CAEB66]">Parcel Arrives</span> On Time – No Fuss.</h3>
                <Link to="/beArider"
                className="btn bg-[#CAEB66] px-6 text-black">Be A Rider</Link>
            </div>
            <img src={riderImage} className="" alt="" />
        </div>
    );
};

export default Banner;