import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Prescription() {
    const [description, setDescription] = useState('');
    const [medicine, setMedicine] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isPrescriptionSubmitted, setIsPrescriptionSubmitted] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const { p_id, app_id } = useParams();
    const navigate = useNavigate();

    const [doctorId, setDoctorId] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setDoctorId(userData.id);
            setUserId(userData.id);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description || !medicine) {
            setMessage('Please fill in all the required fields');
            setMessageType('danger');
            return;
        }

        const prescriptionData = {
            patientId: p_id,
            doctorId: doctorId,
            description: description,
            medicine: medicine,
            appointmentId: app_id
        };

        try {
            const response = await axios.post('/service3/api/prescriptions', prescriptionData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setMessage('Prescription submitted successfully');
                setMessageType('success');
                setIsPrescriptionSubmitted(true);

                setTimeout(() => {
                    setIsHidden(true);
                    navigate(`/users/${userId}/dashboard`);
                }, 1000);
            } else {
                setMessage('Failed to submit the prescription');
                setMessageType('danger');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Error submitting the form');
            }
            setMessageType('danger');
            console.error('Error:', error);
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '81vh' }}>
            <Row className="justify-content-md-center w-100">
                <Col md={6}>
                    <h2 className="text-center mb-4">Submit Prescription</h2>
                    {message && (
                        <Alert variant={messageType} className="text-center">
                            {message}
                        </Alert>
                    )}
                    {!isPrescriptionSubmitted && (
                        <Form onSubmit={handleSubmit} style={{ opacity: isHidden ? 0 : 1, transition: 'opacity 1s ease' }}>
                            <Form.Group className="mb-3" controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="border border-dark rounded"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicMedicine">
                                <Form.Label>Medicine</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter prescribed medicine"
                                    value={medicine}
                                    onChange={(e) => setMedicine(e.target.value)}
                                    className="border border-dark rounded"
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit" className="w-100 rounded">
                                Submit Prescription
                            </Button>
                        </Form>
                    )}
                    {isPrescriptionSubmitted && (
                        <Button variant="dark" onClick={handleBackToHome} className="w-100 rounded">
                            Back to Home
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Prescription;
