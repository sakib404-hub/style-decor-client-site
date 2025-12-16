import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const AreaOfCoverage = ({ locations }) => {
    const position = [23.684994, 90.356331];
    const mapRef = useRef(null);
    //handling the search
    const handleSearchLocation = (event) => {
        event.preventDefault();
        const search = event.target.search.value;
        const district = locations.find((c) => c.district.toLowerCase().includes(search.toLowerCase()))
        if (district) {
            const co_ordinate = [district.latitude, district.longitude]
            mapRef.current.flyTo(co_ordinate, 14)
        }
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Title */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800">
                    Our Area of Coverage
                </h2>
                <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
                    We proudly provide premium decoration and event styling services
                    across multiple cities and locations to make your celebrations
                    truly unforgettable.
                </p>
            </div>

            {/* Map / Coverage Info */}
            <div className="bg-base-200 rounded-2xl p-10 text-center text-gray-600
            grid grid-cols-3">
                <div className="col-span-1  bg-white">
                    <div className="p-5 rounded-xl h-fit sticky top-4">
                        <h2 className="text-xl font-semibold mb-4">
                            Search Service Area
                        </h2>

                        <div>
                            <form
                                onSubmit={handleSearchLocation}
                                className='flex gap-2'>
                                <input
                                    type="text"
                                    name='search'
                                    placeholder="Search by area, city..."
                                    className="input input-bordered w-full rounded-l-xl"
                                />
                                <button
                                    type='submit'
                                    className="btn btn-primary rounded-r-xl">
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Optional helper text */}
                        <p className="text-sm text-gray-500 mt-2">
                            Example: Dhaka, Chittagong, Sylhet
                        </p>
                    </div>
                </div>

                {/* map  */}
                <div className='h-[600px] col-span-2'>
                    <MapContainer
                        className='h-full w-ful'
                        scrollWheelZoom={false}
                        zoom={9}
                        center={position}
                        ref={mapRef}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            locations.map((location, index) => {
                                return <Marker
                                    key={index}
                                    position={[location.latitude, location.longitude]}>
                                    <Popup>
                                        <strong>{location.district}</strong> <br />
                                        Service Area : {location.covered_area.join(', ')}
                                    </Popup>
                                </Marker>
                            })
                        }

                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default AreaOfCoverage;
