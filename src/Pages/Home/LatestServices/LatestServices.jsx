import React from 'react';
import useAxios from '../../../Hooks/useAxios/useAxios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../Components/Spinner/Spinner';
import ServiceCard from '../../../Components/ServiceCard/ServiceCard';
import { useNavigate } from 'react-router';

const LatestServices = () => {
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const { data: services, isLoading } = useQuery({
        queryKey: ['latestServices'],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`/latest-services?limit=8`);
                return res.data;
            } catch (error) {
                console.log(error);
                return {};
            }
        }
    })
    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <div>
            {/* Section Title */}
            <div className="text-center mt-10 px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Latest Decoration Packages
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore our most recent and popular décor services, crafted to make your special moments unforgettable.
                </p>
            </div>

            {/* Services Grid */}
            <div className="p-4 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <ServiceCard key={service._id} service={service} />
                    ))}
                </div>
            </div>

            {/* Explore More Button */}
            <div className="flex items-center justify-center">
                <button
                    onClick={() => navigate('/services')}
                    className="btn btn-primary my-5 px-8"
                >
                    Explore More
                </button>
            </div>
        </div>
    );
};

export default LatestServices;