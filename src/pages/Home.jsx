import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://booking-system-api-ngaiti.sigma-school-full-stack.repl.co/bookings';

const Home = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                navigate('/login');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);



    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newBooking, setNewBooking] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        phone_number: '',
        email: '',
        user_id: ''
    });
    const [selectedBooking, setSelectedBooking] = useState(null);


    const handleOpenModal = (booking) => {
        setShowModal(true);
        if (booking) {
            setSelectedBooking(booking);
            setNewBooking({
                title: booking.title,
                description: booking.description,
                date: booking.date,
                time: booking.time,
                phone_number: booking.phone_number,
                email: booking.email,
                user_id: booking.user_id,
            });
        } else {
            setSelectedBooking(null);
            setNewBooking({
                title: '',
                description: '',
                date: '',
                time: '',
                phone_number: '',
                email: '',
                user_id: '',
            });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // setSelectedBooking(null);
        setNewBooking({
            title: '',
            description: '',
            date: '',
            time: '',
            phone_number: '',
            email: '',
            user_id: ''
        });
    };


    // Fetch all bookings
    const fetchBookings = async () => {
        try {
            const response = await axios.get(API_URL);
            setBookings(response.data.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // Create new booking
    const createBooking = async () => {
        try {
            const response = await axios.post(API_URL, newBooking);
            const createdBooking = response.data.data;
            setBookings([...bookings, createdBooking]);
            handleCloseModal();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    //Update booking
    const updateBooking = async () => {
        try {
            if (!selectedBooking) {
                console.error('Error updating booking: No booking selected.');
                return;
            }
            const response = await axios.put(`${API_URL}/${selectedBooking.booking_id}`, newBooking);
            const updatedBooking = response.data && response.data.data;
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.booking_id === updatedBooking.booking_id
                )
            );
            handleCloseModal();
        } catch (error) {
            console.error('Error updating booking:', error.message);
        }
    };


    // Delete a booking
    const deleteBooking = async (bookingId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/${bookingId}`);
                setBookings(bookings.filter((booking) => booking.booking_id !== bookingId));
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBooking((prevBooking) => ({ ...prevBooking, [name]: value }));
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Container className="mt-5">
            <h1 className="mb-4">Booking App</h1>
            <Button variant="btn btn-outline-primary" onClick={() => handleOpenModal(null)} className="mb-3">
                Create Booking
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>User ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.booking_id}>
                            <td>{booking.booking_id}</td>
                            <td>{booking.title}</td>
                            <td>{booking.description}</td>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.phone_number}</td>
                            <td>{booking.email}</td>
                            <td>{booking.user_id}</td>
                            <td>
                                <Button variant="btn btn-outline-primary mx-4" className='m-3' onClick={() => handleOpenModal(booking)}>
                                    Edit
                                </Button>
                                <Button variant="btn btn-outline-danger" onClick={() => deleteBooking(booking.booking_id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedBooking ? 'Edit Booking' : 'Create Booking'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={newBooking.title} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={newBooking.description} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name="date" value={newBooking.date} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formTime">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time" name="time" value={newBooking.time} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" name="phone_number" value={newBooking.phone_number} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={newBooking.email} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formUserId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control type="text" name="user_id" value={newBooking.user_id} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-outline-secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="btn btn-outline-primary" onClick={selectedBooking ? updateBooking : createBooking}>
                        {selectedBooking ? 'Update Booking' : 'Create Booking'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Home;
