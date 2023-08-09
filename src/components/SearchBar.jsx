import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../RAWG';

const SearchList = () => {
    const [games, setGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [platformFilter, setPlatformFilter] = useState('');
    const [metacriticFilter, setMetacriticFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [ordering, setOrdering] = useState('name'); // Default ordering by name

    useEffect(() => {
        // Fetch games based on filters and ordering
        const fetchGames = async () => {
            try {
                const response = await axios.get(`${BASE_URL}games`, {
                    params: {
                        key: API_KEY,
                        search: searchQuery,
                        platforms: platformFilter,
                        metacritic: metacriticFilter,
                        genres: genreFilter,
                        ordering: ordering,
                    },
                });
                setGames(response.data.results);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, [searchQuery, platformFilter, metacriticFilter, genreFilter, ordering]);

    const handleSearch = () => {
        fetchGames();
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
                <option value="">All Platforms</option>
                {/* Add platform options */}
            </select>
            <select value={metacriticFilter} onChange={(e) => setMetacriticFilter(e.target.value)}>
                <option value="">All Metacritic Ratings</option>
                {/* Add metacritic options */}
            </select>
            <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
                <option value="">All Genres</option>
                {/* Add genre options */}
            </select>
            <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
                <option value="name">Name (A-Z)</option>
                <option value="-name">Name (Z-A)</option>
                <option value="released">Released Date</option>
                {/* Add more ordering options */}
            </select>

            {/* Add a Search Button */}
            <button onClick={handleSearch}>Search</button>

            {/* Display the filtered and ordered games */}
            <div>
                {games.map(game => (
                    <div key={game.id}>
                        <h2>{game.name}</h2>
                        {/* Other game details */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchList;