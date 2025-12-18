import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import Spinner from "../../../Components/Spinner/Spinner";
import ServiceCard from "../../../Components/ServiceCard/ServiceCard";
import ServiceCardEdit from "../../../Components/ServiceCardEdit/ServiceCardEdit";

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

const EditOrRemove = () => {
    const axiosInstanceSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const limit = 6;

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["admin-services", searchText, page],
        queryFn: async () => {
            const res = await axiosInstanceSecure.get(
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
            {/* Header */}
            <motion.div
                variants={fadeUp}
                className="bg-linear-to-r from-slate-50 to-slate-100 py-8 rounded-xl mb-10 text-center"
            >
                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                    Manage Services
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    View, edit, or remove services from your platform. Keep your
                    offerings up to date and organized.
                </p>
            </motion.div>

            {/* Search */}
            <motion.div variants={fadeUp} className="my-10 flex justify-center">
                <input
                    type="text"
                    placeholder="Search services..."
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setPage(1);
                    }}
                    className="flex-1 max-w-md px-4 py-2 rounded-l-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
                <button
                    className="px-5 py-2 bg-slate-800 text-white font-semibold rounded-r-2xl hover:bg-slate-900 transition"
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
                    <FiAlertTriangle className="text-6xl text-slate-500 mb-3" />
                    <h2 className="text-xl font-semibold mb-2">
                        No Services Found
                    </h2>
                    <p className="text-gray-500 text-center max-w-xs">
                        No services match your search criteria.
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
                            <ServiceCardEdit
                                key={service._id}
                                service={service}
                                refetch={refetch}></ServiceCardEdit>
                        ))}
                    </motion.div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-2 mt-10 flex-wrap">
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
                                className={`px-4 py-2 rounded transition ${page === i + 1
                                    ? "bg-slate-800 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
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

export default EditOrRemove;
