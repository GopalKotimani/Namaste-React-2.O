import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValideData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constants';
const Login = () => {
    const [isSignInform, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSignInform = () => {
        setIsSignInForm(!isSignInform);
    };

    const handleButtonClick = () => {
        const message = checkValideData(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;

        if (!isSignInform) {
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: USER_AVATAR
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL
                        }));
                    }).catch((error) => {
                        setErrorMessage(error);
                    });


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });


        } else {
            //Signin Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });


        }

    }
    return (
        <>
            <div>
                <Header />
            </div>
            <div className='absolute'>
                <img src={BG_URL}
                    alt="Logo" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4 w-full'>{isSignInform ? "Sign In" : "Sign Up"}</h1>
                {!isSignInform &&
                    <input
                        ref={name}
                        type='text'
                        placeholder='Full Name'
                        className='p-4 my-2 w-full bg-gray-700 rounded'
                    />
                }
                <input
                    ref={email}
                    type='text'
                    placeholder='Email Address'
                    className='p-4 my-2 w-full bg-gray-700 rounded'
                />
                <input
                    ref={password}
                    type='password'
                    className='p-4 my-2 w-full bg-gray-700 rounded'
                />
                <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
                <button
                    className='p-4 my-4 bg-red-700 w-full rounded'
                    onClick={handleButtonClick}
                >{isSignInform ? "Sign In" : "Sign Up"}</button>
                <p className='py-4 cursor-pointer' onClick={toggleSignInform}> {isSignInform ? "New to Netflix? Sign Up Now" : "Already a Registered? Sign In Now"} </p>
            </form>
        </>
    )
}

export default Login;