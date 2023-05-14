import styles from "./Header.module.css";
import Nav from 'react-bootstrap/Nav';
import { Link, Navigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from "./assets/user.png";
import thering from "./assets/thering.png";
import { ReactElement, useContext, useEffect, useState } from "react";
import { User } from "../../types";
import { LoggedinContext } from "../../Context/LoggedinContext";
import { getUserInfo } from "../../utils/fetchHandlers";

interface HeaderChildProps {
  user?: User,
  loggedin: boolean,
  setLoggedin: (loggedin: boolean) => void
}

const HeaderNotLoggedIn = () => {

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

const HeaderLoggedIn = ({ user, loggedin, setLoggedin }: HeaderChildProps) => {

  let userIcon:ReactElement;
  const logOut = () => {
    setLoggedin(false);
    localStorage.clear();
  }

  if (user) {
    userIcon = <img className={styles.userIcon} src={require(`../AccountPage/assets/avatar_${user?.avatarID}.png`)} alt="user icon" />
  } else {
    userIcon = <img className={styles.userIcon} src={require(`./assets/user.png`)} alt="user icon" />;
  }
  return (
    <header>
      <nav>
        <Link to="/" className={styles.logo}><img src={thering} className={styles.logo} /></Link>
        <Link to="/" className={styles.projectName}>The One</Link>
        <div className={styles.navs}>
          <Nav variant="pills" >
            <div>
              <Nav.Item>
                <Nav.Link className={styles.greeting}><p className={styles.greetings}>Hello, {user?.username?.substring(0, user?.username?.indexOf("@"))}</p></Nav.Link>
              </Nav.Item>
            </div>
            <NavDropdown title={loggedin ? userIcon : icon} id="nav-dropdown" className={styles.navdropdown} >
              <NavDropdown.Item eventKey="4.1" href="/account">Account</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.1" href="/account/favorites">Favorites</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.1" href="/account/blacklist">Blacklist</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2" href="/" onClick={logOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      </nav>
    </header>
  )
}

const Header = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const { loggedin, setLoggedin } = useContext(LoggedinContext);
  useEffect(() => {
    const getUser = async () => {
      let userInfo: User = await getUserInfo();
      setUserInfo(userInfo);
    }
    getUser();
  }, [loggedin]);

  return (
    loggedin ?
      <HeaderLoggedIn user={userInfo} loggedin={loggedin} setLoggedin={setLoggedin} /> :
      <HeaderNotLoggedIn />
  )
}

export default Header;