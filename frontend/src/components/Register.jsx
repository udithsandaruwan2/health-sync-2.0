
import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Ensure axios is installed
import './Register.css'; // Optional: Custom styling

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(1); // Default role: doctor (1)
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
            setMessageType('danger');
            return;
        }

        const userData = {
            username,
            email,
            password,
            role
        };

        try {
            const response = await axios.post(`/service1/api/users`, userData);

            if (response.status === 200) {
                setMessage('Registration successful!');
                setMessageType('success');

                // Redirect to login page after a short delay
                setTimeout(() => navigate('/login'), 1000);
            } else {
                setMessage('There was an issue with the registration.');
                setMessageType('danger');
            }
        } catch (error) {
            setMessage('There was an error registering the user!');
            setMessageType('danger');
            console.error('Error:', error);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '85vh' }}>
            <Row className="justify-content-md-center w-100">
                <Col md={6}>
                    <h2 className="text-center mb-4">Register</h2>
                    {message && (
                        <Alert variant={messageType} className="text-center">
                            {message}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter username" 
                                className="border border-dark rounded"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                className="border border-dark rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                className="border border-dark rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm Password" 
                                className="border border-dark rounded"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                value={role}
                                onChange={(e) => setRole(Number(e.target.value))}
                                className="border border-dark rounded"
                            >
                                <option value={1}>Doctor</option>
                                <option value={2}>Patient</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="dark" type="submit" className="w-100 rounded">

                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
