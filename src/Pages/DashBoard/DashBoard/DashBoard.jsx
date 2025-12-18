import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { RiArchiveDrawerFill } from 'react-icons/ri';
import { FaClipboardList, FaHome } from 'react-icons/fa';
import { PiUserSwitchFill } from 'react-icons/pi';
import Footer from '../../../Components/Footer/Footer';
import { Outlet, useNavigate } from 'react-router';
import useRole from '../../../Hooks/useRole/useRole';
import { MdAssignmentTurnedIn, MdPayments } from "react-icons/md";
import Spinner from '../../../Components/Spinner/Spinner';
import { CgProfile } from "react-icons/cg";
import { GoProjectSymlink } from "react-icons/go";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const DashBoard = () => {
    const navigate = useNavigate();
    const { role, isLoading } = useRole();
    if (isLoading) {
        return <Spinner></Spinner>
    }
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
                        <Outlet>
                        </Outlet>
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
                                    onClick={() => navigate('/dashboard')}
                                    data-tip="Home Page"
                                >
                                    <FaHome className="size-6" />
                                    <span className="is-drawer-close:hidden">Home Page</span>
                                </button>
                            </li>
                            {/* my profile page  */}
                            <li>
                                <button
                                    onClick={() => navigate('/dashboard/profile')}
                                    className="tooltip tooltip-right hover:bg-slate-800 rounded-md"
                                    data-tip="My Profile"
                                >
                                    <CgProfile className="size-6" />
                                    <span className="is-drawer-close:hidden">My Profile</span>
                                </button>
                            </li>
                            {/* my bookings  */}
                            <li>
                                <button
                                    className="tooltip tooltip-right hover:bg-slate-800 rounded-md"
                                    data-tip="My Bookings"
                                    onClick={() => navigate('/dashboard/myBookings')}
                                >
                                    <FaClipboardList className="size-6" />
                                    <span className="is-drawer-close:hidden">My Bookings</span>
                                </button>
                            </li>
                            {
                                role.role === 'decorator' && <li>
                                    <button
                                        className="tooltip tooltip-right hover:bg-slate-800 rounded-md"
                                        data-tip="Assigned Projects"
                                        onClick={() => navigate('/dashboard/manageServices')}
                                    >
                                        <GoProjectSymlink className="size-6" />
                                        <span className="is-drawer-close:hidden">Assigned Projects</span>
                                    </button>
                                </li>
                            }
                            {/* Completed Service  */}
                            <li>
                                <button
                                    className="tooltip tooltip-right hover:bg-slate-800 rounded-md"
                                    data-tip="Completed Service"
                                    onClick={() => navigate('/dashboard/completedService')}
                                >
                                    <IoCheckmarkDoneCircle className="size-6" />
                                    <span className="is-drawer-close:hidden">Completed Service</span>
                                </button>
                            </li>
                            {/* payment History  */}
                            <li>
                                <button
                                    className="tooltip tooltip-right hover:bg-slate-800 rounded-md"
                                    data-tip="Payment History"
                                    onClick={() => navigate('/dashboard/paymentHistory')}
                                >
                                    <MdPayments className="size-6" />
                                    <span className="is-drawer-close:hidden">Payment History</span>
                                </button>
                            </li>
                            {/* assign decorator  */}
                            {
                                role.role === 'admin' && <li>
                                    <button
                                        className="tooltip tooltip-right hover:bg-slate-800 rounded-md"
                                        data-tip="Assign Decorator"
                                        onClick={() => { navigate('/dashboard/assign-decorator') }}
                                    >
                                        <MdAssignmentTurnedIn className="size-6" />
                                        <span className="is-drawer-close:hidden">Assign Decorator</span>
                                    </button>
                                </li>
                            }

                            {/* Manage Users */}
                            {
                                role.role === 'admin' && <li>
                                    <button
                                        className="tooltip tooltip-right hover:bg-slate-800 rounded-md"
                                        data-tip="Manage Users"
                                        onClick={() => { navigate('/dashboard/manageUsers') }}
                                    >
                                        <PiUserSwitchFill className="size-6" />
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </button>
                                </li>
                            }
                        </ul>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div>

    );
};

export default DashBoard;