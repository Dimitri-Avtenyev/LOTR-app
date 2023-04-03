import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { UserContext } from "../Context/UserContext";

const Root = () => {
    const [loggedin, setLoggedin] = useState<boolean>(JSON.parse(localStorage.getItem("loggedin") ?? "false"));
    const {user} = useContext(UserContext);

    useEffect(() => {
        localStorage.setItem("loggedin", JSON.parse(loggedin.toString()));
    }, [loggedin]);
    
    return (
        <div>
            <Header/>
            <div className={styles.content}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Root;