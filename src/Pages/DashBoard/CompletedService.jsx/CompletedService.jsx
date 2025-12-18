import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth/useAuth';
import Spinner from '../../../Components/Spinner/Spinner';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';

const CompletedService = () => {
    const { user } = useAuth();
    const axiosInstanceSecure = useAxiosSecure();

    const { data: completedService = [], isLoading } = useQuery({
        queryKey: ['completedService', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosInstanceSecure.get(
                `/completedService?email=${user.email}`
            );
            return res.data;
        },
    });
    if (isLoading) return <Spinner />;
    return (
        <div>
            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">
                    Service Completed Successfully
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    This service has been completed and successfully delivered to the customer.
                </p>
            </div>

            {/* No Data */}
            {completedService.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                    No completed services found
                </div>
            ) : (
                /* Table */
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Service</th>
                                <th>Decorator Email</th>
                                <th>Customer</th>
                                <th>Service Date</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {completedService.map((service, index) => (
                                <tr key={service._id} className="hover">
                                    <td>{index + 1}</td>

                                    {/* Service */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={service.serviceImg}
                                                alt={service.serviceName}
                                                className="w-12 h-12 rounded"
                                            />
                                            <div>
                                                <p className="font-semibold">{service.serviceName}</p>
                                                <p className="text-xs text-slate-500">
                                                    Tracking: {service.trackingId}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Decorator Email */}
                                    <td className="text-sm">{service.decoratorEmail}</td>

                                    {/* Customer */}
                                    <td>
                                        <p className="font-medium">{service.customerName}</p>
                                        <p className="text-xs text-slate-500">
                                            {service.customerEmail}
                                        </p>
                                    </td>

                                    {/* Date */}
                                    <td>{new Date(service.serviceDate).toLocaleDateString()}</td>

                                    {/* Location */}
                                    <td>{service.serviceLocation}</td>

                                    {/* Price */}
                                    <td className="font-semibold">৳ {service.price}</td>

                                    {/* Status */}
                                    <td>
                                        <span className="badge badge-success badge-outline">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CompletedService;
