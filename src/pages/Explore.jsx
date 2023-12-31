import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../RAWG';
import './Gamelist.css';
import GameCard from '../components/GameCard';
import GameSortDropdown from '../components/GameSortDropdown';
import { AuthContext } from '../components/AuthProvider';

export default function Explore() {
    const [platforms, setPlatforms] = useState([]);
    const [games, setGames] = useState([]);
    const [sortBy, setSortBy] = useState('name');

    const authContext = useContext(AuthContext);


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

    const sortGames = () => {
        let sortedArray = [];

        if (sortBy === 'name') {
            sortedArray = games.concat().sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'released') {
            sortedArray = games.concat().sort(
                (a, b) => new Date(a.released) - new Date(b.released)
            );
        } else if (sortBy === 'metacritic') {
            sortedArray = games.concat().sort(
                (a, b) => b.metacritic - a.metacritic
            );
        }

        setGames(sortedArray);
    };

    const addToWishlist = (game_id) => {
        const user_id = authContext.currentUser.uid;

        axios
            .post('https://capstone-project.ngaiti.repl.co/wishlist', {
                user_id,
                game_id,
            })
            .then(() => {
                console.log('Game added to wishlist successfully');
            })
            .catch((error) => {
                console.error('Error adding game to wishlist:', error);
            });
    };


    useEffect(() => {
        sortGames();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy]);


    return (
        <>
            <GameSortDropdown sortBy={sortBy} setSortBy={setSortBy} />
            <GameCard games={games} addToWishlist={addToWishlist} />
        </>
    );
}