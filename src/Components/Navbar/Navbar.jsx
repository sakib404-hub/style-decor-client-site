import React from 'react';
import Logo from '../Logo/Logo';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logOut } = useAuth();
    const links = (
        <div
            className='flex flex-col md:flex-row bg-linear-to-r from-indigo-500 to-purple-500 md:bg-none gap-6 text-base font-semibold rounded-xl p-2'>
            <NavLink
                to='/'
                className={'nav-link'}>Home</NavLink>
            <NavLink
                to='/services'
                className={'nav-link'}>Our Services</NavLink>
            <NavLink
                to='/aboutUs'
                className={'nav-link'}>About Us</NavLink>
            <NavLink
                to='/contactUs'
                className={'nav-link'}>Contact Us</NavLink>
            {
                user?.email && <NavLink
                    to='/dashboard'
                    className={'nav-link'}>DashBoard</NavLink>
            }
        </div>
    );

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged out!',
                    text: 'You have successfully logged out.',
                    timer: 2000,
                    showConfirmButton: false,
                    position: 'center',
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Failed',
                    text: error.message,
                    confirmButtonColor: '#d33',
                    position: 'center',
                });
            })
    }

    return (
        <div className="navbar bg-linear-to-br from-indigo-200 to-purple-200 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content rounded-box mt-3 w-52 p-2 shadow z-10">
                        {links}
                    </ul>
                </div>
                <Logo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end md:p-2">
                {user ? (
                    <div className="dropdown dropdown-left dropdown-hover cursor-pointer">
                        {/* Avatar */}
                        <div tabIndex={0} role="button" className="m-1">
                            <img
                                src={user.photoURL || "/defaultUser.png"}
                                alt={user.displayName || "User"}
                                title={user.displayName || "User"}
                                className="w-15 h-15 rounded-full object-cover border-2 border-slate-300 hover:border-indigo-500 transition"
                            />
                        </div>

                        {/* Dropdown Menu */}
                        <ul
                            tabIndex={-1}
                            className="dropdown-content menu rounded-lg z-20 p-2 w-48 bg-white border border-slate-200 shadow-lg"
                        >
                            <li>
                                <Link
                                    to="/dashboard"
                                    className="rounded-md px-4 py-2 hover:bg-slate-700 hover:text-white"
                                >
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/dashboard/profile"
                                    className="rounded-md px-4 py-2 hover:bg-slate-700 hover:text-white"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogOut}
                                    className="text-left w-full rounded-md px-4 py-2 hover:bg-red-500 hover:text-white"
                                >
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </div>

                ) : (
                    <button
                        onClick={handleLoginClick}
                        className="btn btn-neutral px-6 py-2 rounded-lg text-white hover:bg-gray-700 transition-colors duration-300"
                    >
                        Login
                    </button>

                )}
            </div>

        </div>
    );
};

export default Navbar;
