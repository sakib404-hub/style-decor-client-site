import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth/useAuth';
import useAxios from '../../../Hooks/useAxios/useAxios';
import Spinner from '../../../Components/Spinner/Spinner';

const CompletedService = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const { data: completedService = [], isLoading } = useQuery({
        queryKey: ['completedService', user?.email],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`/completedService?email=${user?.email}`)
                return res.data;
            } catch (error) {
                console.log(error);
                return [];
            }
        }
    })
    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <div>
            <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800">
                    Service Completed Successfully
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    This service has been completed and successfully delivered to the customer.
                </p>
            </div>
        </div>
    );
};

export default CompletedService;