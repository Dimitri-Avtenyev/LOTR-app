import styles from "./Header.module.css";
import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from "./assets/user.png";
import iconLoggedIn from "./assets/profileLoggedIn.png";
import thering from "./assets/thering.png";
import { useEffect, useState } from "react";

let userIcon = <img className={styles.userIcon} src={icon} alt="user icon"/>


interface HeaderChildProps {
    loggedin: boolean,
    setLoggedin: (loggedin:boolean) => void
}
const HeaderNotLoggedIn = ({loggedin, setLoggedin}:HeaderChildProps) => {
    const logIn = () => {
        localStorage.setItem("loggedin", JSON.parse("true"));
        setLoggedin(true);
    }
    return (
        <header>
            <nav>
                <Link to="/" className={styles.title}>The Projects</Link>
                <div className={styles.navs}>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link className={styles.loginNav} onClick={logIn}>Log in</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <p>|</p>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#" className={styles.loginNav}>Sign up</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </nav>
        </header>
    )
}

const HeaderLoggedIn = ({loggedin, setLoggedin}:HeaderChildProps) => {
    const logOut = () => {
        localStorage.setItem("loggedin", JSON.parse("false"));
        setLoggedin(false);
    }
    return (
    <header>
        <nav>
            <Link to="/" className={styles.logo}><img src={thering} className={styles.logo}/></Link>
            <Link to="/" className={styles.projectName}>The One</Link>
            <div className={styles.navs}>
                <Nav variant="pills" defaultActiveKey="/Favorites">
                    <Nav.Item>
                        <Nav.Link href="/Favorites">Favorites</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/Blacklist">Blacklist</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>Hello, *name*</Nav.Link>
                    </Nav.Item>
                    <NavDropdown title={userIcon} id="nav-dropdown">
                        <NavDropdown.Item eventKey="4.1">Account</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.2" onClick={logOut}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </div>
        </nav>
    </header>
    )
}

const Header = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(JSON.parse(localStorage.getItem("loggedin") ?? "false"));


    useEffect(() => {
    }, [loggedIn]);

    return (
        loggedIn ? 
        <HeaderLoggedIn loggedin={loggedIn} setLoggedin={setLoggedIn}/> : 
        <HeaderNotLoggedIn loggedin={loggedIn} setLoggedin={setLoggedIn}/>
    )
}

export default Header;