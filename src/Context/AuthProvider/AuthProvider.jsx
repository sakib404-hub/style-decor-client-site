import React from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

const AuthProvider = ({ children }) => {
    const information = {
        name: 'Md Sakib Hossen',
        age: 22
    }
    return (
        <AuthContext value={information}>
            {
                children
            }
        </AuthContext>
    );
};

export default AuthProvider;