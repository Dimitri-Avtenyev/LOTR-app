import styles from "./Footer.module.css";
import APLogo from "./assets/AP_logo.png";
import githubLogo from "./assets/githubLogo.png";
import ringLogo from "./assets/thering.png";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&#169; In opdracht van <img src={APLogo} alt="AP_logo"  height="15px"/></p>
            <img src={ringLogo} alt="ring_logo" height="45px" />
            <a href="https://github.com/Dimitri-Avtenyev/LOTR-app">Find us on github <img src={githubLogo} alt="github_logo" height="25px" /></a>   
        </footer>
    )
}

export default Footer;