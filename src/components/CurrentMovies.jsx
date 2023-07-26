import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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

    return (
        <Container>
            <h1>What&apos;s popular now</h1>
            {chunkArray(movies, 4).map((chunk, rowIndex) => (
                <Row key={rowIndex}>
                    {chunk.map((movie) => (
                        <Col key={movie.id} xs={12} sm={6} md={3}>
                            <div>
                                <h3>{movie.title}</h3>
                                <p>Release Date: {movie.release_date}</p>
                                <p>Overview: {movie.overview}</p>
                                <p>Vote Average: {movie.vote_average}</p>
                                <p>Vote Count: {movie.vote_count}</p>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    style={{ width: '100px', height: '150px' }}
                                    alt={movie.title}
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
            ))}
        </Container>
    );
}