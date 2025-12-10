import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className='max-w-[1440px] mx-auto'>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='bg-linear-to-br from-indigo-100 to-purple-100'>
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;