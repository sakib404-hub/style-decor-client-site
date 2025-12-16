import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../Hooks/useAxios/useAxios';
import Spinner from '../../Components/Spinner/Spinner';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';
import { FiAlertTriangle } from 'react-icons/fi';

const Services = () => {
    const axiosInstance = useAxios();
    const [searchText, setSearchtext] = useState('');

    const { data: services = [], isLoading } = useQuery({
        queryKey: ['services', 'allservices', searchText],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`/services?searchText=${searchText}`);
                return res.data;
            } catch (error) {
                console.log(error);
            }
        },
    });

    const eventTypes = ['Housewarming', 'Wedding', 'Birthday', 'Corporate'];

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Hero Banner */}
            <div className="bg-linear-to-r from-indigo-50 to-indigo-100 py-10 rounded-xl mb-10 text-center">
                <h2 className="text-4xl font-bold text-indigo-900 mb-3">
                    Make Every Event Memorable
                </h2>
                <p className="text-indigo-700 max-w-2xl mx-auto">
                    From housewarmings to weddings and parties, our decoration services
                    transform your space into a warm, welcoming, and festive environment.
                </p>
            </div>

            {/* Highlights / Intro */}
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
                <p className="text-gray-600">
                    We provide tailored decoration solutions for your special events,
                    blending tradition and modern aesthetics. Our professional team
                    ensures every detail reflects warmth, elegance, and a festive atmosphere.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-gray-700">
                    <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full">
                        Personalized Themes
                    </span>
                    <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full">
                        High-Quality Décor
                    </span>
                    <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full">
                        Experienced Team
                    </span>
                    <span className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full">
                        On-Time Setup
                    </span>
                </div>
            </div>

            {/* Event Type Filters */}
            <div className="flex justify-center gap-4 my-6 flex-wrap">
                {eventTypes.map((type) => (
                    <button
                        key={type}
                        className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 transition"
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Services Section */}
            <div>
                <h1 className="text-3xl text-center font-semibold text-gray-800 mb-2">
                    Our Services
                </h1>
                <p className="text-gray-600 text-center mb-10">
                    Explore our professional decoration services designed for every occasion.
                </p>
                <div className="my-10">
                    <div className="w-full max-w-md mx-auto flex">
                        <input
                            type="text"
                            placeholder="Search services..."
                            onChange={(event) => setSearchtext(event.target.value)}
                            className="flex-1 px-4 py-2 rounded-l-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white"
                        />
                        <button className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-r-2xl hover:bg-indigo-700 transition">
                            Search
                        </button>
                    </div>
                </div>

                {services.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <FiAlertTriangle className='size-10' />

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            No Services Found
                        </h2>
                        <p className="text-gray-500 text-center max-w-xs">
                            Sorry, we couldn’t find any services matching your search. Try adjusting
                            your keywords or filters.
                        </p>
                    </div>
                )}



                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <ServiceCard key={service._id} service={service} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Testimonials Section */}
            <div className="mt-16 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    What Our Clients Say
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    "The housewarming decoration was beyond our expectations! The team
                    made our home feel warm, welcoming, and beautiful. Highly recommended!"
                </p>
            </div>
        </div>
    );
};

export default Services;
