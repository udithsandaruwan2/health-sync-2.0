import { Card, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AcceptConfirm() {
  const navigate = useNavigate(); // Hook to navigate between pages

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page without accepting
  };

  const handleAccept = () => {
    navigate('/'); // Redirect to a confirmation page or home after accepting
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
            <Button variant="secondary" onClick={handleCancel} className="ml-2">Cancel</Button>
            <Button className="rounded py-2" variant="success" onClick={handleAccept}>Yes, Accept</Button>
          </Card.Body>
        </Card>
      </center>
    </Container>
  );
}

export default AcceptConfirm;
