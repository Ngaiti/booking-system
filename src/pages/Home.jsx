import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../RAWG';
import './Gamelist.css'

import GameCard from '../components/GameCard';


export default function Home() {


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

    useEffect(() => {
        // Log game IDs when the games state changes
        console.log("Game IDs:", games.map(game => game.id));
    }, [games]);

    return (
        <div>
            <h1 className='text-center m-2'>Trending Now</h1>
            <GameCard games={games} />

        </div>
    );
}


