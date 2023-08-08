import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../RAWG';

const LastMonthPS5Games = () => {
    const [ps5Games, setPS5Games] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPS5Games = async () => {
            try {
                // Step 1: Get IDs of target platforms
                const platformsResponse = await axios.get(`${BASE_URL}platforms`, {
                    params: {
                        key: API_KEY,
                    },
                });

                // Find the ID of PS5 platform
                const ps5Platform = platformsResponse.data.results.find(
                    (platform) => platform.name === 'PlayStation 5'
                );

                if (!ps5Platform) {
                    console.error('PS5 platform not found.');
                    setLoading(false);
                    return;
                }

                // Step 2: Get PS5 games released last month
                const currentDate = new Date();
                const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
                const formattedLastMonthDate = lastMonthDate.toISOString().split('T')[0];

                const gamesResponse = await axios.get(`${BASE_URL}games`, {
                    params: {
                        key: API_KEY,
                        dates: `${formattedLastMonthDate},${currentDate.toISOString().split('T')[0]}`,
                        platforms: ps5Platform.id,
                    },
                });

                setPS5Games(gamesResponse.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchPS5Games();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h1>PS5 Games Released Last Month</h1>
            <ul>
                {ps5Games.map((game) => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default LastMonthPS5Games;