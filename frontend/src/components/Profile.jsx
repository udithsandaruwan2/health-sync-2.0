import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import ProfileImage from './ProfileImage';
import './Profile.css';

function Profile() {
    const [user, setUser] = useState({
        id: '',
        username: '',
        email: '',
        role: '',
        name: '',
        specialization: '',
        description: '',
        consultation_fee: 0.0,
        image: '',
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/service1/api/users/${id}`);
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    setMessage('Error loading user data!');
                    setMessageType('danger');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setMessage('Error loading user data!');
                setMessageType('danger');
            }
        };

        fetchUserData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`/service1/api/users`, user);

            if (response.status === 200) {
                setMessage('Profile updated successfully!');
                setMessageType('success');
            } else {
                setMessage('Error updating profile!');
                setMessageType('danger');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage(`Error updating profile! ${error.response ? error.response.data : error.message}`);
            setMessageType('danger');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleImageChange = () => {
        alert('Image change functionality to be implemented');
    };

    const handleBackClick = () => {
        navigate(`/users/${id}/dashboard`);
    };

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Row className="justify-content-md-center w-100">
                <Col md={6}>
                    <h2 className="text-center mb-4">Profile</h2>
                    <ProfileImage image={user.image} onImageChange={handleImageChange} />
                    {message && (
                        <Alert variant={messageType} className="text-center">
                            {message}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '5px',
                                    padding: '.75rem 1.5rem',
                                }}
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={user.username}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '5px',
                                    padding: '.75rem 1.5rem',
                                }}
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '5px',
                                    padding: '.75rem 1.5rem',
                                }}
                                name="role"
                                value={user.role}
                                disabled
                            >
                                <option value={1}>Doctor</option>
                                <option value={2}>Patient</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '5px',
                                    padding: '.75rem 1.5rem',
                                }}
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={user.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSpecialization">
                            <Form.Label>Specialization</Form.Label>
                            <Form.Control
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '5px',
                                    padding: '.75rem 1.5rem',
                                }}
                                type="text"
                                placeholder="Enter specialization"
                                name="specialization"
                                value={user.specialization}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '5px',
                                    padding: '.75rem 1.5rem',
                                }}
                                placeholder="Enter description"
                                name="description"
                                value={user.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConsultationFee">
                            <Form.Label>Consultation Fee</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                min="0"
                                style={{
                                    border: '1px solid #000',
                                    borderRadius: '5px',
                                    padding: '.75rem 1.5rem',
                                }}
                                name="consultation_fee"
                                value={user.consultation_fee}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit" className="w-100 rounded">
                            Update Profile
                        </Button>
                    </Form>
                    <Button onClick={handleBackClick} variant="white" type="button" className="w-100 rounded mt-2">
                        Go Back
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;
