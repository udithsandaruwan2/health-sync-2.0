
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data exists in localStorage whenever the component is mounted or updated
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user data if it exists
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const logout = () => {
    // Clear localStorage and reset user state
    localStorage.removeItem('user');
    setUser(null); // Reset user state
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Navbar
      style={{ backgroundColor: '#ffffff' }}
      expand="lg"
      className="bg-body-black"
    >
      <Container fluid>
        {/* Add logo and brand name */}
        <Link
          to="/"
          style={{ textDecoration: 'none', color: '#000000' }}
        >
          <Navbar.Brand href="#" style={{ color: '#000000', marginLeft: '30px' }}>
            <img
              src="/logo.png" // Adjust the path if the file is in a different location
              alt="Logo"
              style={{ width: '40px', height: '40px', marginRight: '10px', marginLeft: '240px' }}
            />
            Health Sync 2.0
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0 d-flex align-items-center" // Use flexbox to align items
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* Home Link */}
            <Nav.Link>
              <Link
                to="/"
                style={{ textDecoration: 'none', color: '#000000', marginRight: '20px' }} // Add margin to separate items
              >
                <i className="fas fa-home"></i> Home
              </Link>
            </Nav.Link>

            {user ? (
              // If user is authenticated, show the username and logout option
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Nav.Link style={{ marginRight: '10px' }}>
                  <span style={{ color: '#000000', fontWeight: 'bold' }}>
                    Hello, {user.name}
                  </span> {/* Display user's name */}
                </Nav.Link>
                <Nav.Link>
                  <button
                    onClick={logout}
                    className="btn btn-link"
                    style={{
                      textDecoration: 'none',
                      color: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0',
                      backgroundColor: 'transparent',
                      marginRight: '280px',
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </Nav.Link>
              </div>
            ) : (
              // If user is not authenticated, show login and register links
              <>
                <Nav.Link style={{ marginRight: '20px' }}>
                  <Link
                    to="/login"
                    style={{ textDecoration: 'none', color: '#000000' }}
                  >
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/register"
                    style={{
                      textDecoration: 'none',
                      color: '#000000',
                      marginRight: '280px', // Ensure spacing between links
                    }}
                  >
                    <i className="fas fa-user-plus"></i> Register
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;