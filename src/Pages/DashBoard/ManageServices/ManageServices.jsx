import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth/useAuth';
import useAxios from '../../../Hooks/useAxios/useAxios';
import Swal from 'sweetalert2';

const ManageServices = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const { data: assignedServices = [], refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(`/bookings?decoratorEmail=${user?.email}`)
                return res.data;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        }
    })

    const handleUpdateStatus = (bookingId, status) => {
        const update = { status };
        axiosInstance
            .patch(`/bookings/${bookingId}/update`, update)
            .then((res) => {
                if (res.data?.message || res.status === 200) {
                    Swal.fire({
                        title: 'Status Updated!',
                        text: `Service status has been updated to "${status}".`,
                        icon: 'success',
                        confirmButtonColor: '#22c55e',
                        customClass: {
                            popup: 'rounded-xl shadow-lg p-6',
                            title: 'text-lg font-semibold text-gray-800',
                            htmlContainer: 'text-gray-600 mt-2',
                            confirmButton: 'px-6 py-2 font-semibold text-white',
                        },
                        timer: 2000,
                        showConfirmButton: false
                    });
                    refetch();
                }
            })
            .catch((error) => {
                console.error(error);

                Swal.fire({
                    title: 'Update Failed!',
                    text:
                        error?.response?.data?.message ||
                        'Something went wrong while updating the service status.',
                    icon: 'error',
                    confirmButtonColor: '#ef4444',
                    customClass: {
                        popup: 'rounded-xl shadow-lg p-6',
                        title: 'text-lg font-semibold text-gray-800',
                        htmlContainer: 'text-gray-600 mt-2',
                        confirmButton: 'px-6 py-2 font-semibold text-white',
                    }
                });
            });
    };

    const handleUpdateStatusComplete = (bookingId) => {
        Swal.fire({
            title: 'Complete Service?',
            html: `
      <p class="mb-2 text-gray-700">
        Before marking this service as <b>Completed</b>, please make sure:
      </p>
      <ul class="text-left text-sm text-gray-600 list-disc pl-5 space-y-1">
        <li>Planning is finished</li>
        <li>All materials are prepared</li>
        <li>Setup is fully completed</li>
      </ul>
      <p class="mt-3 text-gray-700">Do you want to proceed?</p>
    `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, mark as Completed',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#ef4444',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.post("/completedService", { bookingId });

                    Swal.fire({
                        title: 'Service Completed!',
                        text: 'The service has been completed successfully.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    refetch();

                } catch (error) {
                    Swal.fire({
                        title: 'Failed!',
                        text: `Could not complete the service. Please try again, ${error.message}`,
                        icon: 'error',
                    });
                }
            }
        });
    };

    return (
        <div>
            {/* title  */}
            <div className='flex flex-col items-center justify-center'>
                <h1 className="text-2xl font-bold text-slate-800">
                    Service Progress
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Track and manage the decoration workflow from planning to completion
                </p>
            </div>
            <div className="overflow-x-auto mt-6">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Service</th>
                            <th>Customer</th>
                            <th>Service Date</th>
                            <th>Location</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {assignedServices.length === 0 && (
                            <tr>
                                <td colSpan="9" className="text-center py-10 text-slate-500">
                                    No assigned services found
                                </td>
                            </tr>
                        )}

                        {assignedServices.map((service, index) => (
                            <tr key={service._id} className="hover">
                                <td>{index + 1}</td>

                                {/* Service Info */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={service.serviceImg} alt={service.serviceName} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{service.serviceName}</p>
                                            <p className="text-xs text-slate-500">
                                                Tracking: {service.trackingId}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Customer */}
                                <td>
                                    <p className="font-medium">{service.customerName}</p>
                                    <p className="text-xs text-slate-500">{service.customerEmail}</p>
                                </td>

                                {/* Service Date */}
                                <td>{new Date(service.serviceDate).toLocaleDateString()}</td>

                                {/* Location */}
                                <td>{service.serviceLocation}</td>

                                {/* Price */}
                                <td className="font-semibold">৳ {service.price}</td>

                                {/* Status */}
                                <td>
                                    <span className="badge badge-info badge-outline">
                                        {service.serviceStatus}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            className="btn btn-xs btn-warning"
                                            onClick={() => handleUpdateStatus(service._id, 'Planning')}
                                        >
                                            Planning
                                        </button>

                                        <button
                                            className="btn btn-xs btn-info"
                                            onClick={() => handleUpdateStatus(service._id, 'Material Preparation')}
                                        >
                                            Material Ready
                                        </button>

                                        <button
                                            className="btn btn-xs btn-primary"
                                            onClick={() => handleUpdateStatus(service._id, 'Setup In Progress')}
                                        >
                                            Setup
                                        </button>

                                        <button
                                            className="btn btn-xs btn-success"
                                            onClick={() => handleUpdateStatusComplete(service._id, 'Completed')}
                                        >
                                            Completed
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageServices;