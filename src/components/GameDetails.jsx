import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '2b3d83205aaa4cc1bc4c7a65e9fbf647'; // Replace 'YOUR_API_KEY' with your actual API key
const BASE_URL = 'https://api.rawg.io/api/';

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
                    <li key={platform.id}>{platform.id}{platform.name}</li>
                ))}
            </ul>

            <h1>Games</h1>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DummyData;