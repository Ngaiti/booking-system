import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function CurrentMovies() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const url = 'https://api.themoviedb.org/3/movie/popular';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmMzMWNlOTU5ZmViYzhjMWM3M2IyZTE2Mjc5MGFhNiIsInN1YiI6IjY0YmZlZjZkNmVlM2Q3MDEyNGE5NzM4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLm4d6Oo_CArH272PIT_OUZQzSYi_A9uM0XmHtrNrPQ',
            },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((json) => setMovies(json.results))
            .catch((err) => console.error('error:' + err));
    }, []);

    function chunkArray(array, size) {
        const chunkedArr = [];
        let index = 0;
        while (index < array.length) {
            chunkedArr.push(array.slice(index, size + index));
            index += size;
        }
        return chunkedArr;
    }

    const chunkedMovies = chunkArray(movies, 5).slice(0, 2);

    return (
        <>
            <h1 className="text-center"> Currently Popular Movies</h1>
            <Container className="my-4">
                {chunkedMovies.map((movieChunk, rowIndex) => (
                    <Row key={rowIndex} className="mb-4">
                        {movieChunk.map((movie, colIndex) => (
                            <Col key={colIndex}>
                                <Card>
                                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>
                                            <strong>Vote Average:</strong> {movie.vote_average}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Vote Count:</strong> {movie.vote_count}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
        </>
    );
}