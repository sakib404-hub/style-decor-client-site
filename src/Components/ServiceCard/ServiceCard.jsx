import React from "react";
import { FaStar, FaClock, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();

    const {
        packageName,
        shortDescription,
        images,
        price,
        discountPrice,
        duration,
        rating,
        includes,
        theme,
        isPopular,
        isActive,
    } = service;

    const handleViewButtonClick = (id) => {
        navigate(`/serviceDetails/${id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
        >
            {/* Image */}
            <div className="relative">
                <motion.img
                    src={images}
                    alt={packageName}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                />

                {isPopular && (
                    <span className="absolute top-3 left-3 bg-linear-to-r from-rose-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow">
                        Popular
                    </span>
                )}

                {!isActive && (
                    <span className="absolute top-3 right-3 bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
                        Inactive
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">
                    {packageName}
                </h3>

                <p className="text-sm text-slate-500">
                    {shortDescription}
                </p>

                {/* Theme & Rating */}
                <div className="flex items-center justify-between text-sm">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                        {theme}
                    </span>

                    <span className="flex items-center gap-1 text-amber-500 font-medium">
                        <FaStar />
                        {rating}
                    </span>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <FaClock className="text-slate-500" />
                    <span>{duration}</span>
                </div>

                {/* Includes */}
                <div className="text-sm text-slate-600">
                    <p className="font-medium mb-1 text-slate-700">Includes:</p>
                    <ul className="space-y-1">
                        {includes.slice(0, 2).map((item, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <FaCheckCircle className="text-emerald-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-3">
                    <div>
                        {discountPrice ? (
                            <>
                                <span className="text-lg font-bold text-emerald-600">
                                    ৳{discountPrice}
                                </span>
                                <span className="text-sm line-through text-slate-400 ml-2">
                                    ৳{price}
                                </span>
                            </>
                        ) : (
                            <span className="text-lg font-bold text-slate-800">
                                ৳{price}
                            </span>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleViewButtonClick(service._id)}
                        className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl text-sm transition"
                    >
                        View Details
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
