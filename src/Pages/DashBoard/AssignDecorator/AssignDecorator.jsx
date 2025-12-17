import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxios from '../../../Hooks/useAxios/useAxios';
import Spinner from '../../../Components/Spinner/Spinner';
import Swal from 'sweetalert2';

const AssignDecorator = () => {
    const axiosInstance = useAxios();
    const status = 'available';
    const [selectedbooking, setSelectedBooking] = useState(null);
    const modalRef = useRef();
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['Bookings', 'paid'],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`/paidBookings?status=Paid`)
                return res.data;
            } catch (error) {
                console.log(error);
                return [];
            }
        }
    })
    const { data: decorators = [], refetch } = useQuery({
        queryKey: ['decorators', 'available'],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`/users/${status}/decorator`)
                return res.data;
            } catch (error) {
                console.log(error);
                return [];
            }
        }
    })
    console.log(decorators);



    //handling the assignment of Decorators
    const handleFindDecorator = (booking) => {
        setSelectedBooking(booking);
        modalRef.current.showModal();
    }
    const handleAssignDecorator = async (id) => {
        if (!selectedbooking) {
            return;
        }
        const bookingId = selectedbooking._id;
        const decoratorUpdate = {
            decoratorId: id
        }
        try {
            const res = await axiosInstance.patch(`/bookings/${bookingId}/assign`, decoratorUpdate);

            if (res.data.message) {
                Swal.fire({
                    title: 'Assigned!',
                    text: `Decorator has been successfully assigned to this booking.`,
                    icon: 'success',
                    confirmButtonColor: '#22c55e',
                    customClass: {
                        popup: 'rounded-xl shadow-lg p-6',
                        title: 'text-lg font-semibold text-gray-800',
                        htmlContainer: 'text-gray-600 mt-2',
                        confirmButton: 'px-6 py-2 font-semibold text-white',
                    }
                });
                refetch();
                modalRef.current.close();
            }

        } catch (error) {
            console.error(error.message);
            Swal.fire({
                title: 'Error!',
                text: `Failed to assign decorator: ${error.message}`,
                icon: 'error',
                confirmButtonColor: '#ef4444', // red
                customClass: {
                    popup: 'rounded-xl shadow-lg p-6',
                    title: 'text-lg font-semibold text-gray-800',
                    htmlContainer: 'text-gray-600 mt-2',
                    confirmButton: 'px-6 py-2 font-semibold text-white',
                }
            });
        }

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
                                    {
                                        booking.serviceStatus === 'Paid–Waiting for Assignment' ? <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleFindDecorator(booking)}
                                        >
                                            Find Decorators
                                        </button> : <button
                                            className="btn btn-sm btn-primary"
                                            disabled
                                        >
                                            Decorator Assigned
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <dialog id="my_modal_2" className="modal" ref={modalRef}>
                <div className="modal-box">
                    <h2 className="text-xl font-bold mb-4">Available Decorators</h2>
                    {decorators.length === 0 ? (
                        <p>No decorators available</p>
                    ) : (
                        decorators.map((decorator) => (
                            <div
                                key={decorator._id}
                                className="flex items-center justify-between p-3 mb-3 rounded-lg shadow-sm"
                            >
                                {/* User Info */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={decorator.userImage}
                                        alt={decorator.userName}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{decorator.userName}</p>
                                        <p className="text-sm text-gray-500">{decorator.userEmail}</p>
                                        <p className="text-sm">
                                            Status:{" "}
                                            <span
                                                className={
                                                    decorator.status === "available"
                                                        ? "text-green-500 font-medium"
                                                        : "text-gray-400"
                                                }
                                            >
                                                {decorator.status || "N/A"}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => { handleAssignDecorator(decorator._id) }}
                                    className="btn btn-sm btn-primary"
                                >
                                    Assign
                                </button>
                            </div>
                        ))
                    )}
                    {/* Close button */}
                    <form method="dialog" className="modal-backdrop">
                        <button className="btn btn-secondary mt-4">Close</button>
                    </form>
                </div>

            </dialog>

        </div>
    );
};

export default AssignDecorator;