import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Card, ButtonGroup, Row, Col } from 'react-bootstrap';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';

const API_URL = 'https://capstone-project.ngaiti.repl.co/reviews';

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


    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [reviews, setReviews] = useState([]);
    // const [showModal, setShowModal] = useState(false);
    const [newReview, setNewReview] = useState({
        title: '',
        author: '',
        date: '',
        content: '',
        rating: ''
    });
    const [selectedReview, setSelectedReview] = useState(null);


    const handleOpenModal = (review) => {
        if (review) {
            setShowUpdateModal(true);
            setSelectedReview(review);
            setNewReview({
                title: review.title,
                author: review.author,
                date: review.date,
                content: review.content,
                rating: review.rating,
            });
        } else {
            setShowCreateModal(true);
            setSelectedReview(null);
            setNewReview({
                title: '',
                author: '',
                date: '',
                content: '',
                rating: ''
            });
        }
    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
        setShowUpdateModal(false);
        setNewReview({
            title: '',
            author: '',
            date: '',
            content: '',
            rating: ''
        });
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };


    // Fetch all bookings
    const fetchReviews = async () => {
        try {
            const response = await axios.get(API_URL);
            setReviews(response.data.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // Create new review
    const createReview = async () => {
        try {
            const response = await axios.post(API_URL, newReview);
            const createdReview = response.data.data;
            setReviews([...reviews, createdReview]);
            handleCloseModal();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const updateReview = async () => {
        try {
            await axios.put(`${API_URL}/${selectedReview.id}`, newReview);
            const updatedReviews = reviews.map((review) =>
                review.id === selectedReview.id ? { ...review, ...newReview } : review
            );
            setReviews(updatedReviews);
            handleCloseUpdateModal();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    const deleteReview = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                const updatedReviews = reviews.filter((review) => review.id !== id);
                setReviews(updatedReviews);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>Reviews</h1>
            <Button variant="primary" onClick={() => handleOpenModal(null)}>
                Create New Review
            </Button>
            <Container>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {reviews.map((review, index) => (
                        <Col key={index}>
                            <Card className="my-3 border-2">
                                <Card.Body>
                                    <Card.Title>{review.title}</Card.Title>
                                    <Card.Text>{review.content}</Card.Text>
                                    <div>
                                        <strong>Rating:</strong> {review.rating} out of 10
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="secondary" onClick={() => handleOpenModal(review)}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button variant="secondary" onClick={() => deleteReview(review.id)}>
                                                <i className="bi bi-trash3"></i>
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <ReviewCard
                show={showCreateModal || showUpdateModal}
                onClose={handleCloseModal}
                onSave={selectedReview ? updateReview : createReview}
                selectedReview={selectedReview}
                newReview={newReview}
                handleChange={handleChange}
            />
        </div>
    );
};

export default Home;
