import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const AreaOfCoverage = ({ locations }) => {
    const position = [23.684994, 90.356331];
    const mapRef = useRef(null);

    const handleSearchLocation = (event) => {
        event.preventDefault();
        const search = event.target.search.value.toLowerCase();

        const district = locations.find((c) =>
            c.district.toLowerCase().includes(search)
        );

        if (district && mapRef.current) {
            mapRef.current.flyTo(
                [district.latitude, district.longitude],
                14,
                { animate: true }
            );
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Title */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Our Area of Coverage
                </h2>
                <p className="mt-3 text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
                    We proudly provide premium decoration and event styling services
                    across multiple cities and locations to make your celebrations
                    truly unforgettable.
                </p>
            </div>
            {/* Layout */}
            <div className="bg-base-200 rounded-2xl p-4 md:p-10 flex flex-col md:flex-row gap-6">
                {/* Search Panel */}
                <div className="w-full md:w-1/3">
                    <div className="bg-white p-5 rounded-xl md:sticky md:top-6">
                        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">
                            Search Service Area
                        </h2>
                        <form
                            onSubmit={handleSearchLocation}
                            className="flex flex-col sm:flex-row gap-2"
                        >
                            <input
                                type="text"
                                name="search"
                                placeholder="Search by area, city..."
                                className="input input-bordered w-full rounded-xl sm:rounded-l-xl sm:rounded-r-none"
                            />
                            <button
                                type="submit"
                                className="btn btn-primary w-full sm:w-auto rounded-xl sm:rounded-r-xl sm:rounded-l-none"
                            >
                                Search
                            </button>
                        </form>

                        <p className="text-sm text-gray-500 mt-2 text-center md:text-left">
                            Example: Dhaka, Chittagong, Sylhet
                        </p>
                    </div>
                </div>

                {/* Map */}
                <div className="w-full md:w-2/3">
                    <div className="h-[350px] sm:h-[450px] md:h-[600px] rounded-xl overflow-hidden">
                        <MapContainer
                            className="h-full w-full"
                            center={position}
                            zoom={9}
                            scrollWheelZoom={false}
                            ref={mapRef}
                        >
                            <TileLayer
                                attribution="&copy; OpenStreetMap contributors"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {locations.map((location, index) => (
                                <Marker
                                    key={index}
                                    position={[location.latitude, location.longitude]}
                                >
                                    <Popup>
                                        <strong>{location.district}</strong> <br />
                                        Service Area: {location.covered_area.join(", ")}
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AreaOfCoverage;
