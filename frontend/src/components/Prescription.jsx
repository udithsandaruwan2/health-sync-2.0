import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function PrescriptionCard({ prescription }) {
  return (
    <Card className="my-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
      <Card.Body>
        <Card.Title as="h5">Prescription Details</Card.Title>

        <Card.Text as="div"></Card.Text>
        <Card.Text as="div">
          <strong>Medicine:</strong> {prescription.medicine}
        </Card.Text>

        {/* Description */}
        <Card.Text as="div">
          <strong>Description:</strong> {prescription.description}
        </Card.Text>

        {/* Appointment ID */}
        <Card.Text as="div">
          <strong>Appointment ID:</strong> {prescription.appointmentId}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

PrescriptionCard.propTypes = {
  prescription: PropTypes.shape({
    description: PropTypes.string.isRequired,
    medicine: PropTypes.string.isRequired,
    appointmentId: PropTypes.number.isRequired,
  }).isRequired,
};

export default PrescriptionCard;
