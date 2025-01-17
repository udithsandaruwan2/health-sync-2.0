import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PrescriptionCard from '../components/Prescription';

function PrescriptionsScreen() {
    const { id } = useParams();
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const storedUser = localStorage.getItem('user');
    const userId = storedUser ? JSON.parse(storedUser).id : null;

    const fetchPrescriptions = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/service3/api/appointments/${id}/prescriptions`);
            setPrescriptions(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

    const handleProfileClick = () => {
        if (userId) {
            navigate(-1);
        }
    };

    useEffect(() => {
        if (id) {
            fetchPrescriptions();
        }
    }, [id]);

    if (loading) {
        return <h3 className="text-center">Loading...</h3>;
    }

    if (error) {
        return (
            <div className="text-center">
                <p className="text-danger">Error: {error}</p>
                <Button variant="primary" onClick={fetchPrescriptions}>
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button onClick={handleProfileClick} className="btn btn-dark rounded">
                    Back to Dashboard/Add a Prescription
                </button>
            </div>
            <div>
                <h1 className="mt-4 mb-3">Prescriptions</h1>
                {prescriptions.length === 0 ? (
                    <p className="text-center">No prescriptions available at the moment.</p>
                ) : (
                    <Row>
                        {prescriptions.map((prescription) => (
                            <Col key={prescription.id} sm={12} md={6} lg={4} xl={3}>
                                <PrescriptionCard prescription={prescription} />
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
}

export default PrescriptionsScreen;
