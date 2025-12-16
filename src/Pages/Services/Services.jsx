import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../Hooks/useAxios/useAxios';
import Spinner from '../../Components/Spinner/Spinner';
import ServiceCard from '../../Components/ServiceCard/ServiceCard';

const Services = () => {
    const axiosInstance = useAxios();
    const { data: services = [], isLoading } = useQuery({
        queryKey: ['services', 'allservices'],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get('/services')
                return res.data;
            } catch (error) {
                console.log(error);
            }
        }
    })
    console.log(services);
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {
                isLoading && <Spinner></Spinner>
            }
            <div>
                <h1 className="text-3xl text-center font-semibold text-gray-800 mb-2">
                    Our Services
                </h1>
                <p className="text-gray-600 text-center">
                    Explore our professional decoration services designed for every occasion.
                </p>
            </div>
            <div className='flex items-center justify-center my-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        services.map((service) => {
                            return <ServiceCard
                                key={service._id}
                                service={service}></ServiceCard>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Services;
