import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

function Appointment() {
    // State variables for form fields and messages
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [timeSelected, setTimeSelected] = useState('');
    const [patientId, setPatientId] = useState(null);
    const [doctorId, setDoctorId] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isAppointmentBooked, setIsAppointmentBooked] = useState(false); // State to track appointment status
    const [isHidden, setIsHidden] = useState(false); // State to control hiding the form
    const navigate = useNavigate(); // For navigation after booking appointment

    // useEffect to get patient ID from localStorage and doctor ID from URL
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setPatientId(userData.id);
        }

        const url = window.location.pathname;
        const docId = url.split('/')[2]; // Assuming the URL is something like '/doctors/1/appointments'
        if (docId) {
            setDoctorId(docId);
        }
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the required fields are filled
        if (!reason || !date || !timeSelected) {
            setMessage('Please fill in all the required fields');
            setMessageType('danger');
            return;
        }

        const appointmentData = {
            patientId: patientId,
            docId: doctorId,
            date: date,
            time_selected: timeSelected,
            reason: reason,
            status: 'Pending'
        };

        try {
            const response = await axios.post('/service2/api/appointments', appointmentData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setMessage('Appointment booked successfully');
                setMessageType('success');
                setIsAppointmentBooked(true);

                // Add delay to hide form and show the "Back to Home" button
                setTimeout(() => {
                    setIsHidden(true);
                }, 1000); // Delay of 1 second
            } else {
                setMessage('Failed to book the appointment');
                setMessageType('danger');
            }
        } catch (error) {
            // Check if the error response exists and extract the error message
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message); // Display error message from API
            } else {
                setMessage('Error submitting the form'); // Default error message
            }
            setMessageType('danger');
            console.error('Error:', error);
        }
    };

    // Navigate back to home when "Back to Home" is clicked
    const handleBackToHome = () => {
        navigate('/'); // Assuming '/' is the home route
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '81vh' }}>
            <Row className="justify-content-md-center w-100">
                <Col md={6}>
                    <h2 className="text-center mb-4">Book an Appointment</h2>
                    {message && (
                        <Alert variant={messageType} className="text-center">
                            {message}
                        </Alert>
                    )}
                    {!isAppointmentBooked && (
                        <Form onSubmit={handleSubmit} style={{ opacity: isHidden ? 0 : 1, transition: 'opacity 1s ease' }}>
                            <Form.Group className="mb-3" controlId="formBasicReason">
                                <Form.Label>Reason</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your reason briefly"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="border border-dark rounded"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDate">
                                <Form.Label>Preferred Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="border border-dark rounded"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicTime">
                                <Form.Label>Preferred Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    value={timeSelected}
                                    onChange={(e) => setTimeSelected(e.target.value)}
                                    className="border border-dark rounded"
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit" className="w-100 rounded">
                                Book Appointment
                            </Button>
                        </Form>
                    )}
                    {isAppointmentBooked && (
                        <Button variant="dark" onClick={handleBackToHome} className="w-100 rounded">
                            Back to Home
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Appointment;
