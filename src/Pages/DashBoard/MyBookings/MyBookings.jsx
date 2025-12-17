import React from 'react';
import useAuth from '../../../Hooks/useAuth/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios/useAxios';
import Spinner from '../../../Components/Spinner/Spinner';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyBookings = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    // loading bookings 
    const { data: myBookings = {}, isLoading, refetch } = useQuery({
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
            bookingId: booking._id,
            serviceId: booking.serviceId,
            serviceName: booking.serviceName,
            cost: booking.price,
            customerEmail: booking.customerEmail,
            serviceImg: booking.serviceImg
        }

        try {
            const res = await axiosInstance.post('/create-checkout-session', paymentInfo)
            console.log(res.data)
            window.location.assign(res.data.url);
        } catch (error) {
            console.log(error);
        }
    }

    //handling the cancel booking 
    const handleCancelBooking = (booking) => {
        Swal.fire({
            title: "Cancel Booking?",
            text: "This action will cancel your booking and cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel booking",
            cancelButtonText: "No, keep booking",
            confirmButtonColor: "#e11d48",
            cancelButtonColor: "#16a34a",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/bookings/${booking._id}/delete`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Booking Cancelled",
                                text: "Your booking has been successfully cancelled.",
                                icon: "success",
                                confirmButtonColor: "#16a34a"
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: `Cancellation Failed ${error.message}`,
                            text: "We couldn't cancel your booking right now. Please try again later.",
                            confirmButtonText: "Okay",
                            confirmButtonColor: "#e11d48",
                            background: "#fff5f5",
                            timer: 5000,
                            timerProgressBar: true,
                            customClass: {
                                popup: "rounded-xl",
                                title: "text-red-600 font-bold",
                                htmlContainer: "text-gray-700",
                                confirmButton: "px-6 py-2 rounded-lg font-semibold"
                            }
                        });
                    })
            }
        });
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
                                <th>Service Status</th>
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

                                    <td>{booking.serviceStatus}</td>
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
                                            <button className="btn btn-sm btn-success text-white">
                                                Track Your Service
                                            </button>
                                        ) : (
                                            <div className='space-x-2 flex'>
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => handlePayment(booking)}
                                                >
                                                    Pay
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => handleCancelBooking(booking)}
                                                >
                                                    Cancel Booking
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>) : <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-gray-50">
                    <h3 className="text-2xl font-semibold text-gray-700">
                        No Bookings Yet
                    </h3>
                    <p className="text-gray-500 mt-2 text-center max-w-md p-2">
                        You haven’t made any bookings yet. Once you book a service,
                        your booking details will appear here.
                    </p>
                    <button
                        onClick={() => navigate('/services')}
                        className="mt-6 btn btn-primary rounded-full px-6">
                        Explore Services
                    </button>
                </div>
            }

            {/* Bookings Table */}

        </div>
    );
};

export default MyBookings;
