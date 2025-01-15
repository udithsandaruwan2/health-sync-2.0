import { Form, Button, Container, Row, Col } from 'react-bootstrap';


function Appointment() {
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ height: '85vh' }} // Center vertically and horizontally
        >
            <Row className="justify-content-md-center w-100">
                <Col md={6}>
                    <h2 className="text-center mb-4">Book an Appointment</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your full name" 
                                className="border border-dark rounded" // Adds a dark border
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicContact">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control 
                                type="tel" 
                                placeholder="Enter your contact number" 
                                className="border border-dark rounded" // Adds a dark border
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter your email" 
                                className="border border-dark rounded" // Adds a dark border
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Label>Preferred Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                className="border border-dark rounded" // Adds a dark border
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicTime">
                            <Form.Label>Preferred Time</Form.Label>
                            <Form.Control 
                                type="time" 
                                className="border border-dark rounded" // Adds a dark border
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDoctor">
                            <Form.Label>Select Doctor</Form.Label>
                            <Form.Control 
                                as="select" 
                                className="border border-dark rounded" // Adds a dark border
                            >
                                <option>Select a doctor</option>
                                <option>Dr. John Smith</option>
                                <option>Dr. Jane Doe</option>
                                <option>Dr. Emily Davis</option>
                                <option>Dr. Michael Brown</option>
                            </Form.Control>
                        </Form.Group>
                        <Button
                            variant="dark"
                            type="submit"
                            className="w-100 rounded" // Rounded button
                        >
                            Book Appointment
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Appointment;