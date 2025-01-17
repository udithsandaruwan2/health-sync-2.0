import { Card, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * DeleteConfirm component renders a confirmation dialog for deleting an appointment.
 * 
 * This component retrieves the appointment ID from the URL parameters and the user information from localStorage.
 * It provides two actions: 
 * - handleDelete: Sends a DELETE request to the backend API to delete the appointment and navigates to the user's dashboard.
 * - handleCancel: Navigates to the user's dashboard without deleting the appointment.
 * 
 * @component
 * @example
 * return (
 *   <DeleteConfirm />
 * )
 * 
 * @returns {JSX.Element} A confirmation dialog with options to delete or cancel.
 */
function DeleteConfirm() {
  const { id } = useParams(); // Get appointment ID from the URL
  const navigate = useNavigate(); // Hook to navigate between pages
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage

  const handleDelete = async () => {
    try {
      // Perform DELETE request to the backend API
      await axios.delete(`/service2/api/appointments/${id}`);
      navigate(`/users/${user.id}/dashboard`); // Redirect to the dashboard after deletion
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/users/${user.id}/dashboard`); // Redirect to the dashboard without deleting
  };

    return (
        <>
            
            <Container>
                <center>
                <Card style={{ width: '38rem', borderRadius: '10px', textAlign: 'center' }}>
      <Card.Body>
        <Card.Title>Confirm Deletion</Card.Title>
        <Card.Text>
          Are you sure you want to delete this appointment? This action cannot be undone.
              </Card.Text>
              <Button variant="secondary" onClick={handleCancel} className="ml-2">Cancel</Button>
        <Button className='rounded py-2' variant="danger" onClick={handleDelete}>Yes, Delete</Button>
        
      </Card.Body>
                    </Card>
                    </center>
        </Container>
        </>
      
    
  );
}

export default DeleteConfirm;
