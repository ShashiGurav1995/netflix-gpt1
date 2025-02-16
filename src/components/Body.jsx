import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login.JSX";
import '../App.css';
import {useState } from "react";
import { useDispatch } from "react-redux";

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

    return (
        <RouterProvider router={appRouter}/>
    )
}

export default Body;