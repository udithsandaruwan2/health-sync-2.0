import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Table.css';

function AppointmentTable() {
    const { id } = useParams();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                let url = `/service2/api/patients/${id}/appointments`;
                if (filterStatus) {
                    url = `/service2/api/appointments/status/${filterStatus}/patients/${id}`;
                }
                const { data } = await axios.get(url);
                setAppointments(data);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch appointments');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAppointments();
        }
    }, [id, filterStatus]);

    if (loading) {
        return <h3 className="text-center">Loading...</h3>;
    }

    if (error) {
        return <h3 className="text-center text-danger">{error}</h3>;
    }

    if (appointments.length === 0) {
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mt-4 mb-3">Appointment List</h3>
                    <Form.Group controlId="filterStatus" className="d-flex align-items-center">
                        <Form.Label className="mb-0 me-2">Filter by Status:</Form.Label>
                        <Form.Select
                            size="sm"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="Accept">Accepted</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancel">Cancelled</option>
                        </Form.Select>
                    </Form.Group>
                </div>
                <h3 className="text-center">No appointments available</h3>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mt-4 mb-3">Appointment List</h3>
                <Form.Group controlId="filterStatus" className="d-flex align-items-center">
                    <Form.Label className="mb-0 me-2">Filter by Status:</Form.Label>
                    <Form.Select
                        size="sm"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </Form.Select>
                </Form.Group>
            </div>
            <Table striped bordered hover responsive size="sm" className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Doctor ID</th>
                        <th>Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Time</th>
                        <th>Time Selected</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                            <td>{appointment.docId}</td>
                            <td>{new Date(appointment.date).toLocaleDateString()}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.time_selected}</td>
                            <td className="d-flex justify-content-center">
                                {appointment.status === 'Accept' && (
                                    <Link to={`/users/${appointment.id}/prescriptions`}>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="p-1 px-3 m-0 rounded mx-2"
                                        >
                                            View Prescriptions
                                        </Button>
                                    </Link>
                                )}
                                {appointment.status !== 'Accept' && (
                                    <Link to={`/appointments/${appointment.id}/delete`}>
                                        <Button 
                                            variant="danger" 
                                            size="sm"
                                            className="p-1 px-3 m-0 rounded"
                                        >
                                            Delete
                                        </Button>
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AppointmentTable;
