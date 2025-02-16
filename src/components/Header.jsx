import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { NetflixLogo } from "../utils/constants";

const Header = ()=>{

    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignOut = ()=>{
        signOut(auth).then().catch((err)=>{
            navigate('/error');
        })
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const {uid, email, displayName, photoURL} = user;
                dispatch(addUser({uid : uid, email : email, displayName : displayName, photoURL : photoURL}));
                navigate('/browse');
            }else {
                dispatch(removeUser());
                navigate('/');
            }
        })
    },[])

    return (
        <div className="font absolute bg-gradient-to-b from-black w-full z-20 flex justify-between align-middle">
            <NetflixLogo/>
            {
                user && 
            <div className="flex justify-end gap-3 p-2">
                <img src={user?.photoURL} alt="User" className="w-10 h-10"/>
                <button className="cursor-pointer text-white" onClick={handleSignOut}>Sign Out</button>
            </div>
            }
        </div>
    )
}

export default Header;