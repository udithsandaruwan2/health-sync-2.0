import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Doctor from '../components/Doctor';

function HomeScreen() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/service1/api/users?role=1');
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from the server.');
      }

      setDoctors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  if (loading) {
    return <h3 className="text-center">Loading...</h3>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-danger">Error: {error}</p>
        <Button variant="primary" onClick={fetchDoctors}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mt-4 mb-3">Meet Our Doctors</h1>
      {doctors.length === 0 ? (
        <p className="text-center">No doctors available at the moment.</p>
      ) : (
        <Row>
          {doctors.map((doctor) => (
            <Col key={doctor._id} sm={12} md={6} lg={4} xl={3}>
              <Doctor doctor={doctor} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
