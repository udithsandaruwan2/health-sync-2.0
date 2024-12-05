import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';



function Header() {
return (
    <Navbar bg='dark' variant='dark' expand="lg" className="bg-body-black">
        <Container fluid>
     
                <Navbar.Brand href="#">Health Sync 2.0</Navbar.Brand>
     
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    
                    <Nav.Link>
  <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
    <i className="fas fa-home"></i> Home
  </Link>
</Nav.Link>

<Nav.Link>
    <Link to={"/login"} style={{ textDecoration: "none", color: "inherit" }}>
        <i className="fas fa-sign-in-alt"></i> Login
    </Link>
</Nav.Link>

<Nav.Link>
    <Link to={"/register"} style={{ textDecoration: "none", color: "inherit" }}>
        <i className="fas fa-user-plus"></i> Register
    </Link>
</Nav.Link>

            
                    
                    
                    
                    
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)
}

export default Header