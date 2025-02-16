import { use, useRef, useState } from "react";
import Header from "./Header";
import { validate } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { avtar_url, netflix_bg } from "../utils/constants";

const Login = () => {

    const [signUp, setSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
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
                .then(async (userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    await updateProfile(user, {
                        displayName: name.current.value, photoURL: avtar_url
                    }).then(async () => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        await dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: avtar_url }));
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + ': ' + errorMessage);
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + ': ' + errorMessage);
                });
        }
    }

    return (
        <>
            <Header />
            <div className="absolute">
                <img src={netflix_bg} />
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