import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Table from '../components/Table';
import Table_2 from '../components/Table_2';

function DashboardScreen() {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-fetch
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setRole(user.role);
      setUserId(user.id);
    }
  }, []);

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  const handleHomeClick = () => {
    if (userId) {
      navigate(`/`);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Update the refresh key
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
      {role === 2 && <Table refreshKey={refreshKey} onRefresh={handleRefresh} />}
      {role === 1 && <Table_2 refreshKey={refreshKey} onRefresh={handleRefresh} />}
      {role === null && <p>Loading...</p>}
    </div>
  );
}

export default DashboardScreen;
