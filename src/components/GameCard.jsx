import { Link } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import AuthWrapper from './AuthWrapper';
import Wishlist from './AddtoWishlist';

function getPlatformIcon(platformId) {
    switch (platformId) {
        case 4:
            return <i className="bi bi-pc-display"></i>
        case 186:
            return <i className="bi bi-xbox"></i>
        case 7:
            return <i className="bi bi-nintendo-switch"></i>
        case 18:
        case 187:
            return <i className="bi bi-playstation"></i>;
        default:
            return null;
    }
}

function GameCard({ games, onDelete }) {

    return (
        <div>
            <AuthWrapper>
                <Container className="my-4">
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {games.map((game) => (
                            <Col key={game.id}>
                                <Card className="game-card">
                                    <Link to={`/games/${game.id}`}>
                                        {game.background_image && (
                                            <Card.Img
                                                variant="top"
                                                src={game.background_image}
                                                alt={game.name}
                                                style={{ height: '250px', objectFit: 'cover' }}
                                                className="img-fluid rounded hover-scale-up"
                                            />
                                        )}
                                    </Link>
                                    <Card.Body>
                                        <Card.Title className="text-center">{game.name}
                                            <div>
                                                {game.platforms.map((platform, index) => (
                                                    <span key={index}>
                                                        {getPlatformIcon(platform.platform.id)}{' '}
                                                    </span>
                                                ))}
                                            </div>
                                        </Card.Title>
                                        <div className="hover-details">
                                            <p>Release Date: {game.released}</p>
                                            <p>Metacritic: {game.metacritic}</p>
                                            <p>
                                                Platforms:{' '}
                                                {game.platforms.map((platform, index) => (
                                                    <span key={index}>{platform.platform.name}, </span>
                                                ))}
                                            </p>
                                            <span>
                                                <button onClick={() => onDelete(game.id)} className="delete-button">
                                                    Delete
                                                </button>
                                            </span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </AuthWrapper>
        </div>
    );
}

export default GameCard;