import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { RiArchiveDrawerFill } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';

const DashBoard = () => {
    return (
        <div className="max-w-7xl mx-auto bg-slate-100">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

                {/* Main Content */}
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full">
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

                    <div className="flex min-h-full flex-col bg-slate-900 text-slate-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        <ul className="menu w-full grow p-2">
                            <li>
                                <button
                                    className="hover:bg-slate-800 rounded-md is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                    data-tip="Homepage"
                                >
                                    <FaHome className="is-drawer-close:hidden size-5" />Home Page
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DashBoard;