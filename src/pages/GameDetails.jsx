import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../RAWG';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

const GameDetails = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}games/${gameId}`, {
                    params: {
                        key: API_KEY,
                    },
                });

                setGame(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching game details:', error);
                setLoading(false);
            }
        };

        fetchGameDetails();
        console.log(gameId)
    }, [gameId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const GameDescription = ({ description }) => {
        const descriptionWithBrTags = description.replace(/\n/g, '<br>');
        return (
            <div dangerouslySetInnerHTML={{ __html: descriptionWithBrTags }} />
        );
    };

    return (
        <Container>
            <Row>
                <Col>
                    {/* Background Images */}
                    {game.background_image && (
                        <div className="d-flex justify-content-center">
                            <img
                                src={game.background_image}
                                alt={game.name}
                                style={{ maxWidth: '850px', height: 'auto' }} // Adjust the maxWidth to resize the image
                            />
                        </div>
                    )}

                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h1>{game.name}</h1>
                    <GameDescription description={game.description} />
                    <p>Released: {game.released}</p>
                    <p>Metacritic rating: {game.metacritic}</p>
                    <p>Metacritic rating: {game.metacritic}</p>
                    <p>Metacritic rating: {game.metacritic}</p>

                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h2>Platforms</h2>
                    <ul>
                        {game.platforms.map((platform, index) => (
                            <li key={index}>{platform.platform.name}</li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default GameDetails;