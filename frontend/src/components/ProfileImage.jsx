import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function ProfileImage({ image, onImageChange }) {
    return (
        <div className="text-center mb-4">
            <img
                src={image || 'default-image-url'} // Use a default image URL if no image is provided
                alt="Profile"
                className="rounded-circle"
                style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    border: '2px solid #000',
                }}
            />
            <div className="mt-2">
                <Button
                    variant="dark"
                    onClick={onImageChange}
                    className="rounded py-2"
                    style={{ fontSize: '0.6rem' }}
                >
                    Change Image
                </Button>
            </div>
        </div>
    );
}

ProfileImage.propTypes = {
    image: PropTypes.string,
    onImageChange: PropTypes.func.isRequired,
};

export default ProfileImage;
