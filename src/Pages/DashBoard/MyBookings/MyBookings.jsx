import React from 'react';
import useAuth from '../../../Hooks/useAuth/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios/useAxios';
import Spinner from '../../../Components/Spinner/Spinner';

const MyBookings = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    // loading bookings 
    const { data: myBookings = {}, isLoading } = useQuery({
        queryKey: ['myBookings', user?.email],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`/bookings?email=${user?.email}`);
                return res.data;
            } catch (error) {
                console.log(error);
                return {};
            }
        }
    });

    //handling the payment
    const handlePayment = async (booking) => {
        console.log('Button is clicked');
        const paymentInfo = {
            serviceId: booking.serviceId,
            serviceName: booking.serviceName,
            cost: booking.price,
            customerEmail: booking.customerEmail,
            serviceImg: booking.serviceImg
        }

        // axiosInstance.post('/create-checkout-session', paymentInfo)
        //     .then((res)=>{
        //         console.log(res);
        //     })
        //     .catch((error)=>{
        //         console.log(error);
        //     })

        try {
            const res = await axiosInstance.post('/create-checkout-session', paymentInfo)
            console.log(res.data)
            window.location.assign(res.data.url);
        } catch (error) {
            console.log(error);
        }
    }


    if (isLoading) {
        return <Spinner></Spinner>
    }
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Title */}
            <div className="mb-6 text-center">
                <h1 className="text-4xl font-bold text-gray-800">My Bookings</h1>
                <p className="text-gray-600 mt-2">
                    Here you can view all your upcoming and past bookings.
                    Check details, payment status, and manage your events easily.
                </p>
            </div>
            {
                myBookings.length >= 1 ? (<div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead>
                            <tr>
                                <th>SL No</th>
                                <th>Service</th>
                                <th>Customer</th>
                                <th>Event Type</th>
                                <th>Service Date</th>
                                <th>Price</th>
                                <th>Payment Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {myBookings.map((booking, index) => (
                                <tr key={booking._id}>
                                    <th>{index + 1}</th>

                                    {/* Service Name + Image */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={booking.serviceImg} alt={booking.serviceName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{booking.serviceName}</div>
                                                <div className="text-sm opacity-50">{booking.serviceLocation}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Customer Name + Email */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10">
                                                    <img src={booking.customerImage} alt={booking.customerName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{booking.customerName}</div>
                                                <div className="text-sm opacity-50">{booking.customerEmail}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{booking.eventType}</td>
                                    <td>{new Date(booking.serviceDate).toLocaleDateString()}</td>
                                    <td>৳ {booking.price}</td>

                                    {/* Payment Status */}
                                    <td>
                                        <span
                                            className={`px-2 py-1 rounded-full text-white font-semibold text-sm ${booking.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-red-500'
                                                }`}
                                        >
                                            {booking.paymentStatus}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td>
                                        {booking.paymentStatus.toLowerCase() === 'paid' ? (
                                            <button className="btn btn-sm btn-success cursor-not-allowed" disabled>
                                                Paid
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() => handlePayment(booking)}
                                            >
                                                Pay
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>) : <div>
                    <p>You don't Have Booking Yet!</p>
                </div>
            }

            {/* Bookings Table */}

        </div>
    );
};

export default MyBookings;
