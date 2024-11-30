import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'


function Header() {
return (
    <Navbar bg='dark' variant='dark' expand="lg" className="bg-body-black">
        <Container fluid>
            <LinkContainer to='/'>
                <Navbar.Brand href="#">Health Sync 2.0</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <LinkContainer to='/'>
                        <Nav.Link> <i className='fas fa-home'></i> Home</Nav.Link>
                    </LinkContainer>
                    
                    <LinkContainer to='/login'>
                    <Nav.Link> <i className='fas fa-sign-in-alt'></i> Login</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                    <Nav.Link> <i className='fas fa-user-plus'></i> Register</Nav.Link>
                    </LinkContainer>
                    {/* <LinkContainer to='/contact'>
                    <Nav.Link> <i className='fas fa-envelope'></i> Contact</Nav.Link>
                    </LinkContainer> */}
                    
                    
                    
                    
                    
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
)
}

export default Header