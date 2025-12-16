import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../../Hooks/useAxios/useAxios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';

const ServiceDetails = () => {
    const { id } = useParams();
    const axiosInstance = useAxios();

    const { data: service = {}, isLoading } = useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`/services/${id}/deatils`);
                return res.data;
            } catch (error) {
                console.log(error);
                return {};
            }
        },
    });

    if (isLoading) return <Spinner />;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: Image */}
                <div className="lg:w-1/2 w-full">
                    <img
                        src={service?.images}
                        alt={service?.packageName}
                        className="w-full h-auto rounded-xl shadow-md object-cover"
                    />
                </div>

                {/* Right Column: Information */}
                <div className="lg:w-1/2 w-full flex flex-col gap-4">
                    {/* Title & Short Description */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{service?.packageName}</h1>
                        <p className="text-gray-600">{service?.shortDescription}</p>
                    </div>

                    {/* Ratings, Price, Duration, Theme, Popular */}
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="bg-yellow-400 text-white px-3 py-1 rounded-md font-semibold">
                            ⭐ {service?.rating}
                        </span>
                        <span className="text-xl font-bold text-green-600">
                            ৳ {service?.discountPrice || service?.price}
                        </span>
                        <span className="text-gray-700">Duration: {service?.duration}</span>
                        <span className="text-gray-700">Theme: {service?.theme}</span>
                        <span
                            className={`px-2 py-1 rounded ${service?.isPopular ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                }`}
                        >
                            {service?.isPopular ? 'Popular' : 'Standard'}
                        </span>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700">{service?.description}</p>
                    </div>

                    {/* Includes */}
                    {service?.includes && service?.includes.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Includes</h2>
                            <ul className="list-disc list-inside text-gray-700">
                                {service?.includes.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Event Type */}
                    <div>
                        <span className="inline-block bg-purple-200 text-purple-800 px-3 py-1 rounded-md">
                            Event Type: {service?.eventType}
                        </span>
                    </div>

                    {/* Book Now Button */}
                    <div>
                        <button
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition duration-300 font-semibold w-full lg:w-auto"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
            {/* box for comments  */}
            <div className='mt-10'>
                <div className="mb-6">
                    <textarea
                        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                        rows="4"
                        placeholder="Write your comment..."
                    ></textarea>
                    <button
                        className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition duration-300 font-semibold"
                        onClick={() => alert('Comment submitted!')}
                    >
                        Submit
                    </button>
                </div>
            </div>
            {/* //FAQ Section  */}
            {/* FAQ Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

                <div className="space-y-4 my-10">
                    <details className="shadow-md rounded-xl p-4">
                        <summary className="cursor-pointer font-semibold">Can we customize the décor?</summary>
                        <p className="mt-2 text-gray-700">
                            Yes! You can choose colors, themes, and additional items to match your preferences.
                        </p>
                    </details>

                    <details className="shadow-md rounded-xl p-4">
                        <summary className="cursor-pointer font-semibold">Do you provide outdoor setups?</summary>
                        <p className="mt-2 text-gray-700">
                            Absolutely! We offer both indoor and outdoor setups depending on the venue and availability.
                        </p>
                    </details>

                    <details className="shadow-md rounded-xl p-4">
                        <summary className="cursor-pointer font-semibold">How early should we book?</summary>
                        <p className="mt-2 text-gray-700">
                            We recommend booking at least 2 weeks in advance to ensure availability and proper planning.
                        </p>
                    </details>

                    <details className="shadow-md rounded-xl p-4">
                        <summary className="cursor-pointer font-semibold">Is delivery and setup included?</summary>
                        <p className="mt-2 text-gray-700">
                            Yes, our service includes full delivery, setup, and teardown of all décor items.
                        </p>
                    </details>
                </div>
            </div>

        </div>
    );
};

export default ServiceDetails;
