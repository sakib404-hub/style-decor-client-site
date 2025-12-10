import React from 'react';
import logoImg from '../../assets/StyleDecorLogo.png'
import { useNavigate } from 'react-router';

const Logo = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    }
    return (
        <div
            onClick={handleLogoClick}
            className="flex items-center gap-4 p-1 md:p-5 cursor-pointer">
            <div className="h-10 w-10 md:h-16 md:w-16 rounded-full overflow-hidden flex items-center justify-center shadow-inner">
                <img src={logoImg} alt="StyleDecor Logo" className="object-cover h-full w-full" />
            </div>
            <span className="text-xl md:text-3xl font-bold text-purple-800">StyleDecor</span>
        </div>
    );
};

export default Logo;