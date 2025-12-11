import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //handling creation of the user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //signing in the user information
    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    //handling google sign-In
    const handleGoogleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }
    //handling logOut
    const logOut = () => {
        return signOut(auth);
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
        createUser,
        logInUser,
        handleGoogleSignIn,
        logOut
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