import React from 'react';
import { useNavigate } from 'react-router';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentCancel = () => {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate('/dashboard/myBookings'); // redirect to My Bookings page
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
            <div className='flex flex-col items-center justify-center'>
                {/* Icon */}
                <FaTimesCircle className="text-red-600 text-8xl mb-6 animate-pulse" />

                {/* Title */}
                <h1 className="text-4xl font-bold text-red-700 mb-4 text-center">
                    Payment Cancelled
                </h1>

                {/* Subtitle */}
                <p className="text-center text-gray-700 mb-8 max-w-md">
                    Unfortunately, your payment was not completed.
                    You can try again or go back to your bookings to review your orders.
                </p>

                {/* Return Button */}
                <button
                    onClick={handleReturn}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                    Return to My Bookings
                </button>
            </div>
        </div>
    );
};

export default PaymentCancel;
