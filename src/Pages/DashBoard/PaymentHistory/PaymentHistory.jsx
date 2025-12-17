import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hooks/useAxios/useAxios';
import useAuth from '../../../Hooks/useAuth/useAuth';
import Spinner from '../../../Components/Spinner/Spinner';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/payments?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });
    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className="p-6">
            {/* Title */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Payment History
                </h2>
                <p className="text-gray-500">
                    View all your completed and successful payments
                </p>
            </div>

            {/* Empty State */}
            {payments.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 rounded-xl bg-gray-50">
                    <h3 className="text-xl font-semibold text-gray-700">
                        No Payments Found
                    </h3>
                    <p className="text-gray-500 text-center mt-2 p-2">
                        You haven’t made any payments yet. Once you complete a booking,
                        your payment history will appear here.
                    </p>
                </div>
            )}

            {/* Payment Table */}
            {payments.length > 0 && (
                <div className="overflow-x-auto rounded-xl">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>#</th>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Currency</th>
                                <th>Status</th>
                                <th>Paid At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="hover">
                                    <td>{index + 1}</td>
                                    <td className="font-mono text-sm">
                                        {payment.transactionId}
                                    </td>
                                    <td className="font-semibold">
                                        ৳{payment.amount.toLocaleString()}
                                    </td>
                                    <td className="uppercase">
                                        {payment.currency}
                                    </td>
                                    <td>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                            {payment.paymentStatus}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(payment.paidAt).toLocaleString()}
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

export default PaymentHistory;
