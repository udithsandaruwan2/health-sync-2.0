import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Table from '../components/Table';
import Table_2 from '../components/Table_2';

function DashboardScreen() {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null); // To store the user ID for navigation
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Get user details from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setRole(user.role); // Assuming `role` is a property of the user object
      setUserId(user.id); // Assuming `id` is a property of the user object
    }
  }, []);

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`); // Navigate to the profile page
    }
    };
    const handleHomeClick = () => {
    if (userId) {
      navigate(`/`); // Navigate to the profile page
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button onClick={handleHomeClick} className="btn btn-dark rounded">
          Back to Home
        </button>
        <button onClick={handleProfileClick} className="btn btn-dark rounded">
          Go to Profile
        </button>
      </div>
      {role === 2 && <Table />}
      {role === 1 && <Table_2 />}
      {role === null && <p>Loading...</p>}
    </div>
  );
}

export default DashboardScreen;
