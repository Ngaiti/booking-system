import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../RAWG';
import { useParams } from 'react-router-dom';
import { Carousel, CarouselItem, Col, Container, Row } from 'react-bootstrap';

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
        return <div></div>;
    }

    const GameDescription = ({ description }) => {
        const descriptionWithBrTags = description.replace(/\n/g, '<br>');
        return (
            <div dangerouslySetInnerHTML={{ __html: descriptionWithBrTags }} />
        );
    };

    return (
        <div className="d-flex justify-content-center m-4">
            <Container>
                <Row xs={1}>
                    <Col>
                        <div className="d-flex justify-content-center">
                            <Carousel style={{ maxWidth: '75%' }}>
                                <Carousel.Item>
                                    <img
                                        src={game.background_image}
                                        alt={game.name}
                                        className="d-block mx-auto border border-1 border-dark rounded shadow mb-5"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        src={game.background_image_additional}
                                        alt={game.name}
                                        className="d-block mx-auto border border-1 border-dark rounded shadow mb-5"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </div>
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