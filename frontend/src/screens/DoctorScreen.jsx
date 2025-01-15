import { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Rating from '../components/Rating';

function DoctorScreen() {
  const { id } = useParams(); // Access the dynamic route parameter
  const [doctor, setDoctor] = useState(null); // State for doctor data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Hook to handle navigation
  const user = JSON.parse(localStorage.getItem('user')); // Check if user is logged in

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/service1/api/users/${id}`);
        setDoctor(data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch doctor details');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBookAppointment = () => {
    if (!user) {
      // If not logged in, redirect to login page
      navigate('/login');
    } else {
      // If logged in, pass user details and navigate to appointment page
      navigate(`/doctors/${doctor._id}/appointments`, { state: { user, doctor } });
    }
  };

  if (loading) {
    return <h3 className="text-center">Loading...</h3>;
  }

  if (error) {
    return (
      <div className="text-center">
        <h2>{error}</h2>
        <Link to="/" className="btn btn-light my-3">Go Back</Link>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="not-found text-center">
        <h2>Doctor not found</h2>
        <Link to="/" className="btn btn-light my-3">Go Back</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={doctor.image} alt={doctor.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{doctor.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={doctor.rating || 0}
                text={`${doctor.numReviews || 0} reviews`}
                color="#f8e825"
              />
            </ListGroup.Item>
            <ListGroup.Item>
              Specialty: {doctor.specialization || 'Not specified'}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {doctor.description || 'No description available'}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Consultation Fee:</Col>
                  <Col>
                    <strong>${doctor.price || 'N/A'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Availability:</Col>
                  <Col>
                    {doctor.countInStock > 0 ? 'Available' : 'Not Available'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="w-100"
                  type="button"
                  disabled={doctor.countInStock === 0}
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DoctorScreen;
