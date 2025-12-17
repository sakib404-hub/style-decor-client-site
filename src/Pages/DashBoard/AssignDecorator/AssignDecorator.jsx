import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hooks/useAxios/useAxios';
import Spinner from '../../../Components/Spinner/Spinner';

const AssignDecorator = () => {
    const axiosInstance = useAxios();
    const { data: bookings = {}, isLoading } = useQuery({
        queryKey: ['Bookings', 'paid'],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`/paidBookings?status=Paid`)
                return res.data;
            } catch (error) {
                console.log(error);
                return {};
            }
        }
    })


    //handling the assignment of Decorators
    const handleAssignDecorator = (bookings) => {
        console.log(bookings)
    }
    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div>
            <div className='flex flex-col items-center justify-center'>
                <h1 className="text-2xl font-bold text-slate-800">
                    Assign Decorators
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Assign available decorators to paid bookings and manage service delivery status
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Customer</th>
                            <th>Service Status</th>
                            <th>Service Date</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-slate-500">
                                    No paid bookings available for assignment
                                </td>
                            </tr>
                        )}

                        {bookings.map((booking, index) => (
                            <tr key={booking._id} className="hover">
                                <td>{index + 1}</td>

                                {/* Service */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={booking.serviceImg} alt={booking.serviceName} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{booking.serviceName}</p>
                                            <p className="text-xs text-slate-500">{booking.serviceLocation}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Customer */}
                                <td>
                                    <div>
                                        <p className="font-medium">{booking.customerName}</p>
                                        <p className="text-xs text-slate-500">{booking.customerEmail}</p>
                                    </div>
                                </td>

                                {/* Service Status */}
                                <td>
                                    <span className="badge badge-info badge-outline">
                                        {booking.serviceStatus}
                                    </span>
                                </td>

                                {/* Service Date */}
                                <td>
                                    {new Date(booking.serviceDate).toLocaleDateString()}
                                </td>

                                {/* Price */}
                                <td className="font-semibold">৳ {booking.price}</td>

                                {/* Payment Status */}
                                <td>
                                    <span className="badge badge-success text-white">
                                        Paid
                                    </span>
                                </td>

                                {/* Action */}
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleAssignDecorator(booking)}
                                    >
                                        Find Decorators
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AssignDecorator;