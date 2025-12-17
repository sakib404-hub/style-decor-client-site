import React, { useRef } from 'react';
import { useParams } from 'react-router';
import useAxios from '../../Hooks/useAxios/useAxios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';
import { motion } from "framer-motion";
import { ImCross } from "react-icons/im";
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth/useAuth'
import Swal from 'sweetalert2';

const ServiceDetails = () => {
    const { id } = useParams();
    const axiosInstance = useAxios();
    const modalRef = useRef();
    const { user } = useAuth();

    const { data: service = {}, isLoading } = useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/services/${id}/details`);
            return res.data;
        },
    });

    //handling the bookNow
    const { register, handleSubmit, reset } = useForm();

    const fromSubmission = (data) => {
        const selectedDate = new Date(data.bookingDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            reset();
            Swal.fire({
                icon: 'error',
                title: 'Invalid Date',
                text: 'You cannot book a service for a past date. Please select a valid date.',
                confirmButtonColor: '#f87171'
            });
            return;
        }
        Swal.fire({
            title: "Confirm Your Booking",
            text: `Do you want to confirm your booking for "${service?.packageName}" on ${data.bookingDate}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Book Now",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#4ade80",
            cancelButtonColor: "#f87171",
            reverseButtons: true,
            focusCancel: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 1000);
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const newBooking = {
                    serviceId: service._id,
                    serviceName: service.packageName,
                    serviceImg: service.images,
                    eventType: service.eventType,
                    customerName: data.name,
                    customerEmail: data.email,
                    customerImage: user.photoURL,
                    bookingDate: new Date(),
                    serviceDate: data.bookingDate,
                    serviceLocation: data.location,
                    paymentStatus: 'Unpaid',
                    price: service.discountPrice,
                    serviceStatus: 'Pending Payment'
                }
                axiosInstance.post('/bookings', newBooking)
                    .then((res) => {
                        if (res.data.insertedId) {
                            reset();
                            Swal.fire({
                                title: "Booking Confirmed!",
                                html: `<p>Your booking for <strong>${service?.packageName}</strong> on <strong>${data.bookingDate}</strong> has been confirmed.</p>`,
                                icon: "success",
                                confirmButtonColor: "#4ade80"
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: `Booking Failed ${error.message}`,
                            text: 'Oops! Something went wrong while processing your booking. Please try again.',
                            confirmButtonText: 'Retry',
                            confirmButtonColor: '#f87171',
                            background: '#fff5f5',
                            customClass: {
                                title: 'text-red-600 text-lg font-bold',
                                htmlContainer: 'text-gray-700 text-base',
                                confirmButton: 'px-6 py-2 rounded-lg font-semibold'
                            },
                            timer: 5000,
                            timerProgressBar: true
                        });

                    })
            }
        });
    }

    //handling the bookNow Button
    const handleBookNow = () => {
        modalRef.current.showModal();
    }

    if (isLoading) return <Spinner />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto p-4"
        >
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: -40, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="lg:w-1/2 w-full"
                >
                    <img
                        src={service?.images}
                        alt={service?.packageName}
                        className="w-full h-auto rounded-xl shadow-md object-cover"
                    />
                </motion.div>

                {/* Info */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="lg:w-1/2 w-full flex flex-col gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{service?.packageName}</h1>
                        <p className="text-gray-600">{service?.shortDescription}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <span className="bg-yellow-400 text-white px-3 py-1 rounded-md font-semibold">
                            ⭐ {service?.rating}
                        </span>
                        <span className="text-xl font-bold text-green-600">
                            ৳ {service?.discountPrice || service?.price}
                        </span>
                        <span className="text-gray-700">Duration: {service?.duration}</span>
                        <span className="text-gray-700">Theme: {service?.theme}</span>
                        <span
                            className={`px-2 py-1 rounded ${service?.isPopular ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                }`}
                        >
                            {service?.isPopular ? 'Popular' : 'Standard'}
                        </span>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700">{service?.description}</p>
                    </div>

                    {service?.includes?.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Includes</h2>
                            <ul className="list-disc list-inside text-gray-700">
                                {service?.includes.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <span className="inline-block bg-purple-200 text-purple-800 px-3 py-1 rounded-md w-fit">
                        Event Type: {service?.eventType}
                    </span>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBookNow(service)}
                        className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-[#ff5656e8] transition font-semibold w-full lg:w-auto"
                    >
                        Book Now
                    </motion.button>
                    <dialog id="my_modal_1" className="modal" ref={modalRef}>
                        <div className="modal-box relative max-w-lg w-full bg-linear-to-r from-pink-50 to-rose-50">

                            {/* Top-right close button */}
                            <form method="dialog">
                                <button
                                    className="btn btn-sm btn-circle absolute right-2 top-2"
                                >
                                    <ImCross />
                                </button>
                            </form>

                            <h3 className="text-2xl font-bold mb-2 text-center text-rose-700">Book This Service</h3>

                            {/* Service Info */}
                            <div className="mb-4 p-4 rounded-lg text-center bg-white shadow">
                                <p className="font-semibold text-gray-800">{service?.packageName}</p>
                                <p className="text-green-600 font-bold text-lg">
                                    Price: ৳ {service?.discountPrice || service?.price || 0}
                                </p>
                                <p className="text-gray-600">{service?.eventType}</p>
                            </div>

                            {/* Booking Form */}
                            <form
                                onSubmit={handleSubmit(fromSubmission)}
                                className="flex flex-col gap-4"
                            >
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="label font-semibold text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Your Name"
                                        className="input input-bordered w-full bg-white"
                                        defaultValue={user?.displayName || ''}
                                        {...register('name', { required: true })}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email" className="label font-semibold text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Your Email"
                                        className="input input-bordered w-full bg-white"
                                        defaultValue={user?.email || ''}
                                        {...register('email', { required: true })}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="date" className="label font-semibold text-gray-700">Booking Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="input input-bordered w-full bg-white"
                                        {...register('bookingDate', { required: true })}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="location" className="label font-semibold text-gray-700">Event Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        placeholder="Enter Event Location"
                                        className="input input-bordered w-full bg-white"
                                        {...register('location', { required: true })}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!user}
                                    className={`bg-primary text-white px-6 py-3 rounded-xl transition font-semibold w-full lg:w-auto
                                            ${!user ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ff5656e8]'}`}
                                    onClick={() => modalRef.current.close()}
                                >
                                    {user ? 'Book Now' : 'Login to Book'}
                                </button>
                            </form>
                        </div>
                    </dialog>




                </motion.div>
            </div >

            {/* Comment Box */}
            < motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-10"
            >
                <textarea
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 resize-none"
                    rows="4"
                    placeholder="Write your comment..."
                />
                <button className="mt-3 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition font-semibold">
                    Submit
                </button>
            </motion.div >

            {/* FAQ */}
            < motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-10"
            >
                <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {[
                        "Can we customize the décor?",
                        "Do you provide outdoor setups?",
                        "How early should we book?",
                        "Is delivery and setup included?",
                    ].map((q, i) => (
                        <motion.details
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="shadow-md rounded-xl p-4"
                        >
                            <summary className="cursor-pointer font-semibold">{q}</summary>
                            <p className="mt-2 text-gray-700">
                                Yes, this service includes full customization, setup, and support.
                            </p>
                        </motion.details>
                    ))}
                </div>
            </motion.div >
        </motion.div >
    );
};

export default ServiceDetails;
