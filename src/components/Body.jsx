import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login.JSX";
import '../App.css';
import { useState } from "react";

const Body = ()=>{

    const [netflixBack, setNetflixBack] = useState(true);

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