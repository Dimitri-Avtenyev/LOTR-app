import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

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