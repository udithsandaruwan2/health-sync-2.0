import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Doctor from '../components/Doctor';

function HomeScreen() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Use the proxy path if configured in Vite
        const response = await fetch('/service1/api/users?role=1');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setDoctors(data); // Assuming the API response is an array of doctors
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <h3 className="text-center">Loading...</h3>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="mt-4 mb-3">Meet Our Doctors</h1>
      <Row>
        {doctors.map(doctor => (
          <Col key={doctor._id} sm={12} md={6} lg={4} xl={3}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
