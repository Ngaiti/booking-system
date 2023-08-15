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
        <div className="d-flex justify-content-center m-5">
            <Container>
                <Row xs={1}>
                    <Col>
                        {game.background_image && (
                            <div className="d-flex justify-content-center">
                                <img
                                    src={game.background_image}
                                    alt={game.name}
                                    style={{ maxWidth: '80%', height: 'auto' }}
                                    className=' border border-1 border-dark rounded shadow mb-5'
                                />
                            </div>
                        )}

                    </Col>
                </Row>
                <Row xs={1} lg={2} className="mr-2">
                    <Col>
                        <h1>{game.name}</h1>
                        <GameDescription description={game.description} />

                    </Col>
                    <Col>
                        <h1>Platforms</h1>
                        <ul>
                            {game.platforms.map((platform, index) => (
                                <li key={index}>{platform.platform.name}</li>
                            ))}
                        </ul>
                        <h2>Released:</h2> <p>{game.released}</p>
                        <h2>Metacritic rating:</h2> {game.metacritic}

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default GameDetails;