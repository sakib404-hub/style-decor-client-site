import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [paymentInfo, setPaymentInfo] = useState({});

    const axiosInstanceSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosInstanceSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then((res) => {
                    console.log(res);
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,
                    })
                })
        }
    }, [axiosInstanceSecure, sessionId])

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-green-100 p-6">
            <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center transform animate-fadeIn">

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-20 h-20 text-green-500 animate-pulse" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Successful!
                </h1>

                {/* Subtitle */}
                <p className="text-gray-600 mb-6">
                    Your payment has been completed successfully.
                    Thank you for using our service!
                </p>
                <p>
                    Your Transaction id : {paymentInfo.transactionId}
                </p>
                <p>Your Tracking id is : {paymentInfo.trackingId}</p>

                {/* Button */}
                <Link
                    to="/dashboard/myBookings"
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-200 inline-block"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;