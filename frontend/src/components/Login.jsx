
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios'; 
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const location = useLocation();

  // Get the previous location from state or fallback to root
  const redirectPath = location.state?.from || '/';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true); // Show loading spinner on form submission

    try {
      const response = await axios.post('/service1/api/auth/login', { email, password });

      // On successful login, store user data and redirect
      localStorage.setItem('user', JSON.stringify(response.data));

      navigate(redirectPath); // Redirect to previous or default page
      window.location.reload(); // Refresh page to apply login state
    } catch (error) {
      // Handle error with detailed message
      setError(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false); // Hide loading spinner after request is complete
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: '85vh' }}>
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error */}
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-dark rounded"
                required
                aria-describedby="emailHelp"
              />
              <Form.Text id="emailHelp" muted>
                We wll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-dark rounded"
                required
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100 rounded" disabled={loading}>
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Login'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
