import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Table.css'; // Import your CSS file if necessary

function AppointmentTable() {
    const { id } = useParams(); // Get id from URL parameters
    const [appointments, setAppointments] = useState([]); // State to store fetched appointments
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/service2/api/patients/${id}/appointments`);
                setAppointments(data); // Store fetched appointments in state
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch appointments');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAppointments(); // Fetch appointments if user ID exists in the URL
        }
    }, [id]); // Dependency array now includes id

    if (loading) {
        return <h3 className="text-center">Loading...</h3>;
    }

    if (error) {
        return <h3 className="text-center text-danger">{error}</h3>;
    }

    if (appointments.length === 0) {
        return <h3 className="text-center">No appointments available</h3>;
    }

    return (
        <div>

            <div className="d-flex justify-content-center mb-3">
                            <h3 className="mt-4 mb-3">Appointment List</h3>
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
                            <td>{new Date(appointment.date).toLocaleDateString()}</td> {/* Format date */}
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                            <td>{appointment.time}</td> {/* Display time */}
                            <td>{appointment.time_selected}</td> {/* Display selected time */}
                            <td className="d-flex justify-content-center">
                                {/* Use Button as a wrapper around Link */}
                                <Link to={`/appointments/${appointment.id}/delete`}>
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        className="p-1 px-3 m-0 rounded"
                                    >
                                        Delete
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AppointmentTable;
