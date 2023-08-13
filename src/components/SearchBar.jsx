import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../RAWG';

const SearchList = () => {
    const [games, setGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [platformFilter, setPlatformFilter] = useState('');
    const [metacriticFilter, setMetacriticFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [ordering, setOrdering] = useState('name'); // Default ordering by name
    const [platforms, setPlatforms] = useState([]);
    const [metacriticOptions, setMetacriticOptions] = useState([]);
    const [genreOptions, setGenreOptions] = useState([]);

    const validMetacriticFilter = metacriticOptions.some(option => option.value === metacriticFilter);

    if (!validMetacriticFilter) {
        setMetacriticFilter(''); // Reset to default
    }

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

        // Fetch metacritic options (you need to adjust the endpoint according to your API)
        // Example assuming an endpoint like `${BASE_URL}metacritic-options`
        axios
            .get(`${BASE_URL}metacritic-options`, {
                params: {
                    key: API_KEY,
                },
            })
            .then((response) => {
                setMetacriticOptions(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching metacritic options:', error);
            });

        // Fetch genre options
        axios
            .get(`${BASE_URL}genres`, {
                params: {
                    key: API_KEY,
                },
            })
            .then((response) => {
                setGenreOptions(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching genre options:', error);
            });

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
            {/* ... other input fields ... */}

            {/* Platform Dropdown */}
            <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
                <option value="">All Platforms</option>
                {platforms.map(platform => (
                    <option key={platform.id} value={platform.id}>{platform.name}</option>
                ))}
            </select>

            {/* Metacritic Dropdown */}
            <select value={metacriticFilter} onChange={(e) => setMetacriticFilter(e.target.value)}>
                <option value="">All Metacritic Ratings</option>
                {metacriticOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>

            {/* Genre Dropdown */}
            <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
                <option value="">All Genres</option>
                {genreOptions.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>

        </div>
    );
};

export default SearchList;