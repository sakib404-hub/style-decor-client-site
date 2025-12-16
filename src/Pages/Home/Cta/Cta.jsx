import { FaPhoneAlt, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const DecorationCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="py-16 px-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-6xl mx-auto bg-linear-to-r from-pink-500 to-rose-500 rounded-3xl shadow-xl p-10 text-center text-white"
            >
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                >
                    Make your moments unforgettable
                </motion.h2>

                {/* Sub text */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="text-lg opacity-90 mb-8"
                >
                    Beautiful decorations for birthdays, weddings, housewarming & more
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    {/* Call Now */}
                    <motion.a
                        href="tel:+880123456789"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-white text-rose-600 font-semibold px-8 py-3 rounded-2xl hover:bg-gray-100 transition"
                    >
                        <FaPhoneAlt />
                        Call Now
                    </motion.a>

                    {/* Book Online */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/services")}
                        className="flex items-center justify-center gap-2 bg-black/20 border border-white/30 backdrop-blur font-semibold px-8 py-3 rounded-2xl hover:bg-black/30 transition"
                    >
                        <FaCalendarCheck />
                        Book Online
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default DecorationCTA;
