import React from 'react';
import useAxios from '../../../../Hooks/useAxios/useAxios';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../../Components/Spinner/Spinner';
import useAuth from '../../../../Hooks/useAuth/useAuth';
import { FaTasks, FaCheckCircle, FaCoins, FaToggleOn } from 'react-icons/fa';
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

const DecoratorDashBoard = () => {
    const axiosInstance = useAxios();
    const { user } = useAuth();

    const { data: decoratorSummary = {}, isLoading } = useQuery({
        queryKey: ['decoratorSummary', user?.email],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get(
                    `/dashboard/decorator/summary?email=${user.email}`
                );
                return res.data;
            } catch (error) {
                console.log(error);
                return {};
            }
        },
    });

    if (isLoading) {
        return <Spinner></Spinner>
    };

    const stats = [
        {
            title: 'Assigned Services',
            value: decoratorSummary.assignedServices,
            icon: <FaTasks className="text-4xl" />,
            bg: 'bg-gradient-to-r from-indigo-500 to-indigo-400',
        },
        {
            title: 'Completed Services',
            value: decoratorSummary.completedServices,
            icon: <FaCheckCircle className="text-4xl" />,
            bg: 'bg-gradient-to-r from-teal-500 to-teal-400',
        },
        {
            title: 'Total Earnings',
            value: `৳ ${decoratorSummary.totalEarning}`,
            icon: <FaCoins className="text-4xl" />,
            bg: 'bg-gradient-to-r from-yellow-500 to-yellow-400',
        },
        {
            title: 'Availability',
            value: decoratorSummary.availability,
            icon: <FaToggleOn className="text-4xl" />,
            bg: decoratorSummary.availability === 'available'
                ? 'bg-gradient-to-r from-green-500 to-green-400'
                : 'bg-gradient-to-r from-red-500 to-red-400',
        },
    ];

    const barData = [
        {
            name: 'Assigned',
            value: decoratorSummary.assignedServices,
        },
        {
            name: 'Completed',
            value: decoratorSummary.completedServices,
        },
    ];

    const pieData = [
        {
            name: 'Availability',
            value: decoratorSummary.availability === 'available' ? 1 : 0,
        },
        {
            name: 'Unavailable',
            value: decoratorSummary.availability === 'available' ? 0 : 1,
        },
    ];
    const COLORS = ['#10b981', '#ef4444'];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">
                Decorator Dashboard Summary
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                    <h2 className="text-xl font-semibold mb-4">Services Overview</h2>
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

                {/* Pie Chart */}
                <div className="bg-white shadow-lg rounded-xl p-4">
                    <h2 className="text-xl font-semibold mb-4">Availability</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#3b82f6"
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

export default DecoratorDashBoard;
