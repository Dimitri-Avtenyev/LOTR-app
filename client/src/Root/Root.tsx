import React from "react";
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import Startpage from "../Startpage/Startpage";
import NavBar from "../Navbar/Navbar";

const Root = () => {
    return (
        <div>
            <NavBar/>
            <Startpage/>
        </div>
    );
}

export default Root;