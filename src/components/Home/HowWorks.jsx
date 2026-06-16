import truck from "../../assets/truck.png"
import cash from "../../assets/cash.png"
import hub from "../../assets/hub.png"
import booking from "../../assets/booking.png"

const HowWorks = () => {

    const worksProcessing = [
        {
            id: 1,
            img:truck,
            title: 'Booking Pick & Drop',
            desc: 'From personal packages to business shipments — we deliver on time, every time.'
        },
        {
            id: 1,
            img:cash,
            title: 'Cash On Delivery',
            desc: 'Cash on Delivery available — pay only when your package arrives.'
        },
        {
            id: 1,
            img:hub,
            title: 'Delivery Hub',
            desc: 'All your logistics in one place — simple, fast, and dependable delivery hub.'
        },
        {
            id: 1,
            img:booking,
            title: 'Booking SME & Corporate',
            desc: 'Enterprise-ready booking solutions tailored for SMEs and corporate delivery needs.'
        }
    ]

    return (
        <div className="max-w-350 w-11/12 mx-auto mt-36">
            <h3 className="text-4xl text-[#104a51] font-bold">How it Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-8 gap-6">
                {
                    worksProcessing.map(work => <div className="bg-white rounded-2xl flex flex-col gap-5 p-7 transition-all duration-500 hover:-translate-y-2 border border-gray-200">
                        {<img src={work.img} className="w-12" alt="" /> }
                        <h3 className="text-xl text-black font-semibold">{work.title}</h3>
                        <p className="text-gray-500">{work.desc}</p>
                    </div>)
                }
            </div>

        </div>
    );
};

export default HowWorks;