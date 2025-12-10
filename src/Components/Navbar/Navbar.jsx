import React from 'react';
import Logo from '../Logo/Logo';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
    const links = (
        <>
            <li><a href="#">Submenu 1</a></li>
            <li><a href="#">Submenu 2</a></li>
        </>
    );

    const handleLoginClick = () => {
        navigate('/login');
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
                <button
                    onClick={handleLoginClick}
                    className="btn btn-neutral">Login</button>
            </div>
        </div>
    );
};

export default Navbar;
