import { useRef, useState } from "react";
import Header from "./Header";
import { validate } from "../utils/validate";

const Login = ()=>{

    const [signUp, setSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const email = useRef(null);
    const password = useRef(null);

    const userSignUp = ()=>{
        return setSignUp(!signUp);
    }

    const handleBtnClick = ()=>{
        const message = validate(email.current.value, password.current.value);
        console.log(message);
        setErrorMessage(message);
    }

    return(
        <>
        <Header/>
        <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_large.jpg"/>
        </div>
        <div className="pt-40">
        <form className="relative z-10 mx-auto max-w-80 w-full bg-black opacity-80 flex justify-center align-middle flex-col p-12 gap-3" onSubmit={(e)=>{e.preventDefault()}}>
            <h1 className="text-white text-4xl">{signUp ? 'Sign Up' : 'Sign In'}</h1>
            {signUp && <input type="text" placeholder="Full Name" className="w-100 py-2 px-1 bg-gray-700 text-gray-100 opacity-100 placeholder:text-gray-300"/>}
            <input type="text" placeholder="Email/Phone Number" className="w-100 py-2 px-1 bg-gray-700 text-gray-100 opacity-100 placeholder:text-gray-300" ref={email}/>
            <input type="password" placeholder="Password" className="w-100 py-2 px-1 bg-gray-700 text-gray-100 opacity-100 placeholder:text-gray-300" ref={password}/>
            <p className="text-red-600 font-bold text-base">{errorMessage==null ? '' : errorMessage}</p>
            <button onClick={handleBtnClick} className="w-full bg-red-700 text-gray-100 text-xl py-2">{signUp ? 'Sign Up' : 'Sign In'}</button>
            <p className="text-white text-base font-bold">{signUp ? 'Already User?' : 'New to Netflix?'} <span className="text-red-600 cursor-pointer" onClick={userSignUp}>{signUp ? 'Sign in Now' : 'Sign Up Now'}</span></p>
        </form>
        </div>
        </>
)
}

export default Login;