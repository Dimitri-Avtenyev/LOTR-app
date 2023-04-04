import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Root = () => {

    return (
        <div>
            <Header />
            <div className={styles.content}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Root;