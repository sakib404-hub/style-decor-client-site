import React from 'react';
import useAxios from '../../../Hooks/useAxios/useAxios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../Components/Spinner/Spinner';
import ServiceCard from '../../../Components/ServiceCard/ServiceCard';

const LatestServices = () => {
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
            <div className="flex items-center justify-center my-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <ServiceCard key={service._id} service={service} />
                    ))}
                </div>
            </div>
            <button>Explore More</button>
        </div>
    );
};

export default LatestServices;