import { use, useRef, useState } from "react";
import Header from "./Header";
import { validate } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {

    const [signUp, setSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const userSignUp = () => {
        return setSignUp(!signUp);
    }

    const handleBtnClick = () => {
        const message = validate(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;

        if (signUp) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL : 'https://cdn.vectorstock.com/i/1000v/89/50/generic-person-gray-photo-placeholder-man-vector-24848950.avif'
                      }).then(() => {
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                                        dispatch(addUser({uid : uid, email : email, displayName : displayName, photoURL}));
                      }).catch((error) => {
                        // An error occurred
                        // ...
                      });
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + ': ' + errorMessage);
                    navigate("/");
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + ': ' + errorMessage);
                    navigate("/");
                });
        }
    }

    return (
        <>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_large.jpg" />
            </div>
            <div className="pt-40">
                <form className="relative z-10 mx-auto max-w-80 w-full bg-black opacity-80 flex justify-center align-middle flex-col p-12 gap-3" onSubmit={(e) => { e.preventDefault() }}>
                    <h1 className="text-white text-4xl">{signUp ? 'Sign Up' : 'Sign In'}</h1>
                    {signUp && <input type="text" placeholder="Full Name" className="w-100 py-2 px-1 bg-gray-700 text-gray-100 opacity-100 placeholder:text-gray-300" ref={name} />}
                    <input type="text" placeholder="Email/Phone Number" className="w-100 py-2 px-1 bg-gray-700 text-gray-100 opacity-100 placeholder:text-gray-300" ref={email} />
                    <input type="password" placeholder="Password" className="w-100 py-2 px-1 bg-gray-700 text-gray-100 opacity-100 placeholder:text-gray-300" ref={password} />
                    <p className="text-red-600 font-bold text-base">{errorMessage == null ? '' : errorMessage}</p>
                    <button onClick={handleBtnClick} className="w-full bg-red-700 text-gray-100 text-xl py-2">{signUp ? 'Sign Up' : 'Sign In'}</button>
                    <p className="text-white text-base font-bold">{signUp ? 'Already User?' : 'New to Netflix?'} <span className="text-red-600 cursor-pointer" onClick={userSignUp}>{signUp ? 'Sign in Now' : 'Sign Up Now'}</span></p>
                </form>
            </div>
        </>
    )
}

export default Login;