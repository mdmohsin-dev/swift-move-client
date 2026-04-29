import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from "react-router";
import { useRef } from "react";

const Coverage = () => {
    const position = [24.4370, 90.7832]
    const serviceCenter = useLoaderData()
    const mapRef = useRef(null)

    const handleSearch = (e) => {
        e.preventDefault()
        const location = e.target.location.value;

        const district = serviceCenter.find(c => c.district.toLowerCase().includes(location.toLowerCase()))

        if (district) {
            const coordinate = [district.latitude, district.longitude]
            mapRef.current.flyTo(coordinate,12)
        }

    }

    return (
        <div className="max-w-350 mx-auto bg-white rounded-3xl md:p-10  p-6 mt-8">
            <h3 className="lg:text-[56px] text-4xl font-bold">We are available in 64 districts</h3>
            <div className="md:mt-12 mt-7">
                <form onSubmit={handleSearch}>
                    <div className="border border-gray-300 max-w-md flex justify-between">
                        <input name="location"
                            className="input focus:outline-none border-none w-full" placeholder="Search by district" type="text" />
                        <button type="submit" className="btn bg-[#AED82F]">Search</button>
                    </div>
                </form>
            </div>
            <p className="text-3xl font-bold md:pt-14  pt-8">We deliver almost all over Bangladesh</p>
            <div className="mt-12">
                <MapContainer
                    center={position}
                    zoom={10}
                    scrollWheelZoom={true}
                    className="h-140"
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        serviceCenter.map(center => <Marker position={[center.latitude, center.longitude]}>
                            <Popup>
                                <p className="font-semibold text-lg">{center.district}</p>
                                <p>Service Area: {center.covered_area.join(', ')}</p>
                            </Popup>
                        </Marker>)
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;