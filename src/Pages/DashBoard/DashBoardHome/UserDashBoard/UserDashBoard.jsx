import React from 'react';
import useAuth from '../../../../Hooks/useAuth/useAuth';
import Spinner from '../../../../Components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { FaShoppingCart, FaCalendarAlt, FaCheckCircle, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure/useAxiosSecure';


const UserDashBoard = () => {
    const axiosInstanceSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: userSummary = {}, isLoading } = useQuery({
        queryKey: ['userSummary', user?.email],
        queryFn: async () => {
            try {
                const res = await axiosInstanceSecure.get(
                    `/dashboard/user/summary?email=${user.email}`
                );
                return res.data;
            } catch (error) {
                console.log(error);
                return {};
            }
        },
    });

    if (isLoading) return <Spinner />;

    const stats = [
        {
            title: 'Total Bookings',
            value: userSummary.totalBookings,
            icon: <FaShoppingCart className="text-4xl" />,
            bg: 'bg-gradient-to-r from-indigo-500 to-indigo-400',
        },
        {
            title: 'Upcoming Services',
            value: userSummary.upcomingServices,
            icon: <FaCalendarAlt className="text-4xl" />,
            bg: 'bg-gradient-to-r from-green-500 to-green-400',
        },
        {
            title: 'Completed Services',
            value: userSummary.completedServices,
            icon: <FaCheckCircle className="text-4xl" />,
            bg: 'bg-gradient-to-r from-teal-500 to-teal-400',
        },
        {
            title: 'Total Paid',
            value: `৳ ${userSummary.totalPaid}`,
            icon: <FaMoneyBillWave className="text-4xl" />,
            bg: 'bg-gradient-to-r from-yellow-500 to-yellow-400',
        },
        {
            title: 'Pending Payments',
            value: userSummary.pendingPayments,
            icon: <FaClock className="text-4xl" />,
            bg: 'bg-gradient-to-r from-red-500 to-red-400',
        },
    ];

    const barData = [
        {
            name: 'Upcoming',
            value: userSummary.upcomingServices,
        },
        {
            name: 'Completed',
            value: userSummary.completedServices,
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">
                User Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-4 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 ${stat.bg}`}
                    >
                        <div className="shrink-0 w-16 h-16 flex items-center justify-center bg-white bg-opacity-20 rounded-full">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">{stat.title}</p>
                            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bar Chart */}
            <div className="bg-white shadow-lg rounded-xl p-4">
                <h2 className="text-xl font-semibold mb-4">Service Status Overview</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" radius={[5, 5, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserDashBoard;
