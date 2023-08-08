import { useState, useEffect } from 'react';
import { Card, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../RAWG';
import './Gamelist.css'

export default function Home() {

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




    const [platforms, setPlatforms] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Fetch platforms
        axios
            .get(`${BASE_URL}platforms`, {
                params: {
                    key: API_KEY,
                },
            })
            .then((response) => {
                setPlatforms(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching platforms:', error);
            });

        // Fetch games
        axios
            .get(`${BASE_URL}games`, {
                params: {
                    key: API_KEY,
                    dates: '2023-06-01,2023-06-30',
                    platforms: '187',
                },
            })
            .then((response) => {
                setGames(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching games:', error);
            });
    }, []);





    return (
        <div>
            <Container className="my-4">
                <Row xs={1} md={2} lg={4} className="g-4">
                    {games.map((game) => (
                        <Col key={game.id}>
                            <Link to={`/games/${game.id}`}>
                                <Card className="game-card">
                                    {game.background_image && (
                                        <Card.Img
                                            variant="top"
                                            src={game.background_image}
                                            alt={game.name}
                                            style={{ height: '250px', objectFit: 'cover' }}
                                            className="img-fluid rounded hover-scale-up"
                                        />
                                    )}
                                    <Card.Body>
                                        <Card.Title className="text-center">{game.name}</Card.Title>
                                        <div className="hover-details">
                                            <p>Release Date: {game.released}</p>
                                            <p>Metacritic: {game.metacritic}</p>
                                            <p>
                                                Platforms:{' '}
                                                {game.platforms.map((platform, index) => (
                                                    <span key={index}>{platform.platform.name}, </span>
                                                ))}
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}


