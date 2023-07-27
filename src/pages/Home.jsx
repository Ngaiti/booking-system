import { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const url = 'https://api.themoviedb.org/3/movie/now_playing';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmMzMWNlOTU5ZmViYzhjMWM3M2IyZTE2Mjc5MGFhNiIsInN1YiI6IjY0YmZlZjZkNmVlM2Q3MDEyNGE5NzM4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLm4d6Oo_CArH272PIT_OUZQzSYi_A9uM0XmHtrNrPQ',
                },
            };

            try {
                const response = await fetch(url, options);
                const json = await response.json();
                setMovies(json.results);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };

        fetchMovies();
    }, []);

    const movieRows = movies.slice(0, 3 * 4);


    return (
        <div>
            <br />
            <h2 className='text-center'>Now Playing ~</h2>
            <Container className="my-4">
                <Row xs={1} md={2} lg={4} className="g-4">
                    {movieRows.map((movie) => (
                        <Col key={movie.id}>
                            <Card>
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}