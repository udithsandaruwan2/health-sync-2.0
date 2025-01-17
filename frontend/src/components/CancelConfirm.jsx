import { Card, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function CancelConfirm() {
  const navigate = useNavigate(); // Hook to navigate between pages
  const { id } = useParams(); // Get the dynamic user ID from the route

  // Function to handle the 'Back' button click
  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Function to handle the 'Yes, Cancel' button click
  const handleConfirmCancel = async () => {
    try {
      // Send a request to update the appointment status to 'Cancel'
      const response = await fetch(`/service2/api/appointments/${id}/status`, {
        method: 'PUT', // Assuming it's a PUT request; adjust as per your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Cancel' }),
      });

      if (response.ok) {
        // Redirect to the dashboard after successful cancellation
        navigate(`/users/${id}/dashboard`);
      } else {
        // Handle the error response
        const errorData = await response.json();
        console.error('Failed to update status:', errorData);
        alert('Failed to cancel the appointment. Please try again.');
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.error('Error while updating appointment status:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Container>
      <center>
        <Card style={{ width: '38rem', borderRadius: '10px', textAlign: 'center' }}>
          <Card.Body>
            <Card.Title>Confirm Cancellation</Card.Title>
            <Card.Text>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </Card.Text>
            <Button variant="secondary" onClick={handleCancel} className="ml-2">Back</Button>
            <Button className="rounded py-2" variant="danger" onClick={handleConfirmCancel}>Yes, Cancel</Button>
          </Card.Body>
        </Card>
      </center>
    </Container>
  );
}

export default CancelConfirm;
