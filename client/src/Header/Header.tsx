import styles from "./Header.module.css";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
    <header>
        <nav>
            <p className={styles.logo}>Image</p>
            <h1 className={styles.projectName}>The One</h1>
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
                    <NavDropdown title="image" id="nav-dropdown">
                        <NavDropdown.Item eventKey="4.1">Account</NavDropdown.Item>
                        <NavDropdown.Item eventKey="4.2">Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </div>
        </nav>
    </header>
    )
}

export default Header;