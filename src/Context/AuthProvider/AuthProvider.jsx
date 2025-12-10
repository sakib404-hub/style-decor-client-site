import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const { user, setUser } = useState(null);
    const { loading, setLoading } = useState(true);
    //handling google sign-In
    const handleGoogleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }
    // setting up the observer 
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [setUser, setLoading])
    const information = {
        user,
        setUser,
        loading,
        setLoading,
        handleGoogleSignIn,
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