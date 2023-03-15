import React from "react";
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import styles from "./Root.module.css";
import Startpage from "../Startpage/Startpage";
import NavBar from "../Navbar/Navbar";

const Root = () => {
    return (
        <div>
            <NavBar/>
            <div className={styles.content}>
				<Outlet/> 
			</div>
        </div>
    );
}

export default Root;