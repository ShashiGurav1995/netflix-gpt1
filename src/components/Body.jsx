import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login.JSX";
import '../App.css';
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";

const Body = ()=>{

    const [netflixBack, setNetflixBack] = useState(true);

    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path : '/',
            element : <Login />
        },
        {
            path : '/browse',
            element : <Browse/>
        }
    ])

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const {uid, email, displayName, photoURL} = user;
                dispatch(addUser({uid : uid, email : email, displayName : displayName, photoURL : photoURL}));
            }else {
                dispatch(removeUser());
            }
        })
    },[])

    return (
        <RouterProvider router={appRouter}/>
    )
}

export default Body;