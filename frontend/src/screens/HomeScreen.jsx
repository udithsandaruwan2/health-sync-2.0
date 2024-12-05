import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Doctor from '../components/Doctor';

// Import the doctor data from the local JSON file
import doctorsData from '../doctors.json'; 

function HomeScreen() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Instead of fetching from an API, just set the data from the JSON file
    setDoctors(doctorsData);
  }, []);

  return (
    <div>
      <h1 className="mt-4 mb-3">Meet Our Doctors</h1> {/* Updated heading */}
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
