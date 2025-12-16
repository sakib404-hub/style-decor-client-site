import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-base-200 px-4 py-12 flex justify-center">
            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-sm p-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-gray-800">Contact StyleDecor</h1>
                    <p className="mt-3 text-gray-500 max-w-2xl">
                        Let’s bring your celebration to life. Reach out to us for bookings,
                        custom décor ideas, or any questions you may have.
                    </p>
                </motion.div>

                <hr className="my-8" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Get In Touch
                        </h2>

                        <div className="flex items-center gap-4">
                            <div className="p-4 rounded-full bg-pink-100 text-pink-600">
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">Phone</p>
                                <p className="text-gray-500">+880 1XXX-XXXXXX</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-4 rounded-full bg-pink-100 text-pink-600">
                                <FaEnvelope />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">Email</p>
                                <p className="text-gray-500">styledecor@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="p-4 rounded-full bg-pink-100 text-pink-600">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">Location</p>
                                <p className="text-gray-500">
                                    Dhaka, Bangladesh
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-500 pt-4">
                            Our team is available 7 days a week to assist you with your events
                            and decoration needs.
                        </p>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Message sent successfully!");
                        }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Send Us a Message
                        </h2>

                        <div>
                            <label className="block text-gray-600 mb-1">Your Name</label>
                            <input
                                type="text"
                                required
                                placeholder="Enter your name"
                                className="w-full input input-bordered rounded-xl"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full input input-bordered rounded-xl"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Event Type</label>
                            <select className="w-full select select-bordered rounded-xl">
                                <option>Birthday</option>
                                <option>Anniversary</option>
                                <option>Housewarming</option>
                                <option>Corporate Event</option>
                                <option>Custom Decoration</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Tell us about your event..."
                                className="w-full textarea textarea-bordered rounded-xl"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn w-full bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-lg"
                        >
                            Send Message
                        </button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
