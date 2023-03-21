import React from "react";
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import Startpage from "../Startpage/Startpage";
import Header from "../Header/Header";
import Quizpage from "../Quizpage/Quizpage";
import Footer from "../Footer/Footer";

const Root = () => {
    return (
        <div>
            <Header/>
            <Quizpage/>
            <Footer/>
        </div>
    );
}

export default Root;