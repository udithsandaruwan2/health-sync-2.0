import { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Rating from '../components/Rating';

function DoctorScreen() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

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
      navigate('/login');
    } else {
      navigate(`/doctors/${doctor.id}/appointments`, { state: { user, doctor } });
    }
  };

  if (loading) {
    return <h3 className="text-center">Loading...</h3>;
  }

  if (error) {
    return (
      <div className="text-center">
        <h2>{error}</h2>
        <Link to="/" className="btn btn-light my-3"> Go Back</Link>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="not-found text-center">
        <h2>Doctor not found</h2>
        <Link to="/" className="btn btn-light my-3 rounded">Go Back</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3 rounded">Go Back</Link>
      <Row>
        <Col md={6}>
          <Card className='my-3 rounded'>
            <Image src={doctor.image} alt={doctor.name} fluid className='rounded'/>
          </Card>
        </Col>
        <Col md={3}>
          <Card className='my-3 p-3 rounded'>
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
          </Card>
        </Col>
        <Col md={3}>
          <Card className='my-3 p-3 rounded'>
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
                  className="w-100 rounded"
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
