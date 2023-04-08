import styles from "./Header.module.css";
import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from "./assets/user.png";
import thering from "./assets/thering.png";
import { useContext } from "react";
import { User } from "../../types";
import { UserContext } from "../../Context/UserContext";
import { LoggedinContext } from "../../Context/LoggedinContext";


interface HeaderChildProps {
    user?: User,
    loggedin: boolean,
    setLoggedin: (loggedin:boolean) => void
}

const HeaderNotLoggedIn = ({loggedin, setLoggedin}:HeaderChildProps) => {

    return (
        <header>
            <nav>
                <Link to="/" className={styles.title}>The Projects</Link>
                <div className={styles.navs}>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="/login" className={styles.loginNav}>Log in</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <p>|</p>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/signup" className={styles.loginNav}>Sign up</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </nav>
        </header>
    )
}

const HeaderLoggedIn = ({user, loggedin, setLoggedin}:HeaderChildProps) => {
    let userIcon = <img className={styles.userIcon} src={require(`../AccountPage/assets/avatar_${user?.avatarID}.png`)} alt="user icon"/>

    const logOut = () => {
        setLoggedin(false);
    }

    return (
    <header>
        <nav>
            <Link to="/" className={styles.logo}><img src={thering} className={styles.logo}/></Link>
            <Link to="/" className={styles.projectName}>The One</Link>
            <div className={styles.navs}>
                {/* {defaultActiveKey="/Favorites"} */}
                <Nav variant="pills" > 
                    <Nav.Item>
                        <Nav.Link href="/account/favorites">Favorites</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/account/blacklisted">Blacklisted</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>Hello, {user?.userName}</Nav.Link>
                    </Nav.Item>
                    <NavDropdown title={userIcon} id="nav-dropdown">
                        <NavDropdown.Item eventKey="4.1" href="/account">
                            Account
                            </NavDropdown.Item>
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