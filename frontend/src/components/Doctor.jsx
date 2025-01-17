import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Rating from './Rating'; // Assuming Rating component exists
import { Link } from 'react-router-dom';

/**
 * Doctor component displays the details of a doctor.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.doctor - The doctor object containing details.
 * @param {string} props.doctor.id - The unique identifier for the doctor.
 * @param {string} props.doctor.image - The URL of the doctor's image.
 * @param {string} props.doctor.name - The name of the doctor.
 * @param {string} props.doctor.specialization - The specialization of the doctor.
 * @param {number} props.doctor.rating - The rating of the doctor.
 * @param {number} props.doctor.num_reviews - The number of reviews for the doctor.
 * @param {number} [props.doctor.consultation_fee] - The consultation fee of the doctor.
 * @returns {JSX.Element} The rendered Doctor component.
 */
function Doctor({ doctor }) {
  return (
        <Card className="my-3 p-3 rounded" style={{ backgroundColor: '#ffffff' }}>
      {/* Link to individual doctor details */}
      <Link to={`/doctors/${doctor.id}`}>
        <Card.Img src={doctor.image} alt={doctor.name} className='rounded' />
      </Link>
      <Card.Body>
        {/* Link to individual doctor details */}
        <Link to={`/doctors/${doctor.id}`}>
          <Card.Title as="div">
            <strong>{doctor.name}</strong>
          </Card.Title>
        </Link>

        {/* Display specialization */}
        <Card.Text as="div">
          <div className="my-3">
            <strong>Specialization:</strong> {doctor.specialization}
          </div>
        </Card.Text>

        {/* Rating and reviews */}
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={doctor.rating} // Assuming doctor has a rating field
              text={`${doctor.num_reviews} reviews`} // Assuming doctor has numReviews field
              color="#f8e825"
            />
          </div>
        </Card.Text>

        {/* Consultation fee */}
        <Card.Text as="h3">
          {doctor.consultation_fee
            ? `LKR ${doctor.consultation_fee}`
            : 'Consultation fee not available'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

Doctor.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,  // Rating field
    num_reviews: PropTypes.number.isRequired, // Number of reviews
    consultation_fee: PropTypes.number, // Consultation fee (optional)
  }).isRequired,
};

export default Doctor;
