import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

import useAxios from "../../Hooks/useAxios/useAxios";
import Spinner from "../../Components/Spinner/Spinner";
import ServiceCard from "../../Components/ServiceCard/ServiceCard";

/* ================= Motion Variants ================= */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};
const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const Services = () => {
    const axiosInstance = useAxios();
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const limit = 6;

    const { data, isLoading } = useQuery({
        queryKey: ["services", searchText, page],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/services?searchText=${searchText}&page=${page}&limit=${limit}`
            );
            return res.data;
        },
        keepPreviousData: true,
    });

    const services = data?.services || [];
    const totalPages = data?.pages || 1;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-4 py-10"
        >
            {/* Hero Section */}
            <motion.div
                variants={fadeUp}
                className="bg-linear-to-r from-indigo-50 to-indigo-100 py-10 rounded-xl mb-10 text-center"
            >
                <h2 className="text-4xl font-bold text-indigo-900 mb-3">
                    Make Every Event Memorable
                </h2>
                <p className="text-indigo-700 max-w-2xl mx-auto">
                    From housewarmings to weddings and parties, our decoration services
                    transform your space into a warm, welcoming, and festive environment.
                </p>
            </motion.div>

            {/* Highlights */}
            <motion.div
                variants={fadeUp}
                className="text-center max-w-3xl mx-auto space-y-4 mb-8"
            >
                <p className="text-gray-600">
                    We provide tailored decoration solutions blending tradition with
                    modern aesthetics. Our professional team ensures every detail feels perfect.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    {["Personalized Themes", "High-Quality Décor", "Experienced Team", "On-Time Setup"].map((item, i) => (
                        <motion.span
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full"
                        >
                            {item}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Search */}
            <motion.div variants={fadeUp} className="my-10 flex justify-center">
                <input
                    type="text"
                    placeholder="Search services..."
                    onChange={(e) => setSearchText(e.target.value)}
                    className="flex-1 max-w-md px-4 py-2 rounded-l-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                    onClick={() => setPage(1)}
                    className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-r-2xl hover:bg-indigo-700 transition"
                >
                    Search
                </button>
            </motion.div>

            {/* Loading */}
            {isLoading && <Spinner />}

            {/* Empty State */}
            {!isLoading && services.length === 0 && (
                <motion.div
                    variants={fadeUp}
                    className="flex flex-col items-center justify-center py-20"
                >
                    <FiAlertTriangle className="text-6xl text-indigo-500 mb-2" />
                    <h2 className="text-xl font-semibold mb-2">No Services Found</h2>
                    <p className="text-gray-500 text-center max-w-xs">
                        Sorry, we couldn’t find any services matching your search.
                    </p>
                </motion.div>
            )}

            {/* Services Grid */}
            {!isLoading && services.length > 0 && (
                <>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {services.map((service) => (
                            <ServiceCard key={service._id} service={service} />
                        ))}
                    </motion.div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-2 mt-8 flex-wrap">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-4 py-2 rounded hover:bg-indigo-200 ${page === i + 1 ? "bg-indigo-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default Services;
