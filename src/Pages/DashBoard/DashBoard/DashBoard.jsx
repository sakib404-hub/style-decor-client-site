import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { RiArchiveDrawerFill } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';
import { PiUserSwitchFill } from 'react-icons/pi';
import Footer from '../../../Components/Footer/Footer';

const DashBoard = () => {
    return (
        <div className="max-w-[1440px] mx-auto bg-slate-100">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

                {/* Main Content */}
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-linear-to-br from-indigo-200 to-purple-200 shadow-sm">
                        <label
                            htmlFor="my-drawer-4"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost text-slate-600"
                        >
                            <RiArchiveDrawerFill
                                className='size-8 cursor-pointer' />
                        </label>

                        <div className="px-4">
                            <Logo />
                        </div>
                    </nav>
                    <div className="p-6 text-slate-700">
                        Page Content
                    </div>
                </div>

                {/* Sidebar */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                    <div className="flex min-h-full flex-col py-5 bg-slate-900 text-slate-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        <ul className="menu w-full grow p-2">

                            {/* Home */}
                            <li>
                                <button
                                    className="tooltip tooltip-right hover:bg-slate-800 rounded-md"
                                    data-tip="Home Page"
                                >
                                    <FaHome className="size-6" />
                                    <span className="is-drawer-close:hidden">Home Page</span>
                                </button>
                            </li>

                            {/* Manage Users */}
                            <li>
                                <button
                                    className="tooltip tooltip-right hover:bg-slate-800 rounded-md"
                                    data-tip="Manage Users"
                                >
                                    <PiUserSwitchFill className="size-6" />
                                    <span className="is-drawer-close:hidden">Manage Users</span>
                                </button>
                            </li>

                        </ul>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div>

    );
};

export default DashBoard;