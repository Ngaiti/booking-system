import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../RAWG';
import { Link } from 'react-router-dom';

const DummyData = () => {
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
                    dates: '2019-09-01,2019-09-30',
                    platforms: '18,1,7',
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
            <h1>Platforms</h1>
            <ul>
                {platforms.map((platform) => (
                    <li key={platform.id}>
                        {platform.id} {platform.name}
                    </li>
                ))}
            </ul>

            <h1>Games</h1>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <Link to={`/game/${game.id}`}>{game.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DummyData;