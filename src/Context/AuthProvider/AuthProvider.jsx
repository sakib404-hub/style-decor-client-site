import React from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    //handling google sign-In
    const handleGoogleSignIn = () => {
        return signInWithPopup(auth, provider);
    }
    const information = {
        handleGoogleSignIn,
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