import { FaTwitter, FaYoutube, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full bg-linear-to-br from-indigo-100 to-purple-100 text-gray-800 p-6 md:p-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                {/* Company Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">StyleDecor</h2>
                    <p className="text-gray-700">Transforming spaces with style and elegance. Bringing your interior dreams to life.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-purple-700 transition">About Us</a></li>
                        <li><a href="#" className="hover:text-purple-700 transition">Contact</a></li>
                        <li><a href="#" className="hover:text-purple-700 transition">Jobs</a></li>
                        <li><a href="#" className="hover:text-purple-700 transition">Press Kit</a></li>
                    </ul>
                </div>

                {/* Services / Categories */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Our Services</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-purple-700 transition">Interior Design</a></li>
                        <li><a href="#" className="hover:text-purple-700 transition">Furniture Design</a></li>
                        <li><a href="#" className="hover:text-purple-700 transition">Decor Consultation</a></li>
                        <li><a href="#" className="hover:text-purple-700 transition">Custom Projects</a></li>
                    </ul>
                </div>

                {/* Newsletter Subscription */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Subscribe to Newsletter</h3>
                    <p className="text-gray-700 mb-3">Get latest updates and offers.</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="p-2 rounded-l-lg border border-gray-300 w-full focus:outline-none"
                        />
                        <button className="bg-purple-600 text-white px-4 rounded-r-lg hover:bg-purple-700 transition">Subscribe</button>
                    </div>
                </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-6 mb-6 text-2xl">
                <a href="#" className="hover:text-gray-600 transition"><FaGithub /></a>
                <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
                <a href="#" className="hover:text-red-600 transition"><FaYoutube /></a>
                <a href="#" className="hover:text-blue-700 transition"><FaFacebookF /></a>
                <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm md:text-base text-gray-600">
                <p>© {new Date().getFullYear()} StyleDecor. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
