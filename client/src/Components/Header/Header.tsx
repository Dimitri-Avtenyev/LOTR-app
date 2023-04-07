import styles from "./Header.module.css";
import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from "./assets/user.png";
import iconLoggedIn from "./assets/profileLoggedIn.png";
import thering from "./assets/thering.png";
import { useContext } from "react";
import { User } from "../../types";
import { UserContext } from "../../Context/UserContext";
import { LoggedinContext } from "../../Context/LoggedinContext";

let userIcon = <img className={styles.userIcon} src={icon} alt="user icon"/>


interface HeaderChildProps {
    user?: User,
    loggedin: boolean,
    setLoggedin: (loggedin:boolean) => void
}

const HeaderNotLoggedIn = ({loggedin, setLoggedin}:HeaderChildProps) => {
    const logIn = () => {
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

const HeaderLoggedIn = ({user, loggedin, setLoggedin}:HeaderChildProps) => {
    const logOut = () => {
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
                        <Nav.Link eventKey="disabled" disabled>Hello, {user?.userName}</Nav.Link>
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
    const {user} = useContext(UserContext);
    const {loggedin, setLoggedin} = useContext(LoggedinContext);
    return (
        loggedin ? 
        <HeaderLoggedIn user={user} loggedin={loggedin} setLoggedin={setLoggedin}/> : 
        <HeaderNotLoggedIn loggedin={loggedin} setLoggedin={setLoggedin}/>
    )
}

export default Header;