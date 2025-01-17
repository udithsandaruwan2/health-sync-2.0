import { Card, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function AcceptConfirm() {
  const navigate = useNavigate(); // Hook to navigate between pages
  const { id } = useParams(); // Get the dynamic ID from the route

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page without accepting
  };

  const handleAccept = async () => {
  try {
    const response = await fetch(`/service2/api/appointments/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Accept' }),
    });

    if (response.ok) {
      // Notify success and refresh appointments
      alert('Appointment accepted successfully.');
      navigate(`/users/${id}/dashboard`); // Navigate back to dashboard
    } else {
      const errorData = await response.json();
      console.error('Failed to update status:', errorData);
      alert('Failed to accept the request. Please try again.');
    }
  } catch (error) {
    console.error('Error while updating appointment status:', error);
    alert('An error occurred. Please try again later.');
  }
};

  return (
    <Container>
      <center>
        <Card style={{ width: '38rem', borderRadius: '10px', textAlign: 'center' }}>
          <Card.Body>
            <Card.Title>Confirm Acceptance</Card.Title>
            <Card.Text>
              Are you sure you want to accept this request? This action cannot be undone.
            </Card.Text>
            <Button variant="secondary" onClick={handleCancel} className="ml-2">
              Cancel
            </Button>
            <Button className="rounded py-2" variant="success" onClick={handleAccept}>
              Yes, Accept
            </Button>
          </Card.Body>
        </Card>
      </center>
    </Container>
  );
}

export default AcceptConfirm;
