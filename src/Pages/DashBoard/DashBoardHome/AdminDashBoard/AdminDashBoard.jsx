import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../../Hooks/useAxios/useAxios';
import {
    FaUsers,
    FaPaintBrush,
    FaShoppingCart,
    FaCheckCircle,
    FaMoneyBillWave,
    FaCoins,
} from 'react-icons/fa';
import Spinner from '../../../../Components/Spinner/Spinner';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

const AdminDashBoard = () => {
    const axiosInstance = useAxios();

    const { data: adminSummary = {}, isLoading } = useQuery({
        queryKey: ['adminSummary'],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get('/dashboard/admin/summary');
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
            title: 'Total Users',
            value: adminSummary.totalUsers,
            icon: <FaUsers className="text-4xl" />,
            bg: 'bg-gradient-to-r from-blue-500 to-blue-400',
        },
        {
            title: 'Total Decorators',
            value: adminSummary.totalDecorators,
            icon: <FaPaintBrush className="text-4xl" />,
            bg: 'bg-gradient-to-r from-purple-500 to-purple-400',
        },
        {
            title: 'Total Bookings',
            value: adminSummary.totalBookings,
            icon: <FaShoppingCart className="text-4xl" />,
            bg: 'bg-gradient-to-r from-green-500 to-green-400',
        },
        {
            title: 'Completed Services',
            value: adminSummary.totalCompleted,
            icon: <FaCheckCircle className="text-4xl" />,
            bg: 'bg-gradient-to-r from-teal-500 to-teal-400',
        },
        {
            title: 'Total Revenue',
            value: `৳ ${adminSummary.totalRevenue}`,
            icon: <FaMoneyBillWave className="text-4xl" />,
            bg: 'bg-gradient-to-r from-yellow-500 to-yellow-400',
        },
        {
            title: 'Decorator Earnings',
            value: `৳ ${adminSummary.totalDecoratorEarnings}`,
            icon: <FaCoins className="text-4xl" />,
            bg: 'bg-gradient-to-r from-orange-500 to-orange-400',
        },
    ];

    const barData = [
        { name: 'Bookings', value: adminSummary.totalBookings },
        { name: 'Completed', value: adminSummary.totalCompleted },
        { name: 'Revenue', value: adminSummary.totalRevenue },
        { name: 'Earnings', value: adminSummary.totalDecoratorEarnings },
    ];

    const pieData = [
        { name: 'Decorators', value: adminSummary.totalDecorators },
        { name: 'Users', value: adminSummary.totalUsers },
    ];

    const COLORS = ['#8884d8', '#82ca9d'];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">
                Admin Dashboard Summary
            </h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
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

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white shadow-lg rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Booking & Revenue Overview</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#4f46e5" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white shadow-lg rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Users vs Decorators</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#82ca9d"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashBoard;
