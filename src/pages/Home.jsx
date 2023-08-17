import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../RAWG';
import './Gamelist.css'

import GameCard from '../components/GameCard';
import { AuthContext } from '../components/AuthProvider';
import WishlistModal from '../components/WishlistModal';


export default function Home() {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const [platforms, setPlatforms] = useState([]);
    const [games, setGames] = useState([]);

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


        const currentDate = new Date();
        const thirtyDaysAgo = new Date(currentDate);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const formattedCurrentDate = currentDate.toISOString().split('T')[0];
        const formattedThirtyDaysAgo = thirtyDaysAgo.toISOString().split('T')[0];

        const last30Days = `${formattedThirtyDaysAgo},${formattedCurrentDate}`;

        // Fetch games
        axios
            .get(`${BASE_URL}games`, {
                params: {
                    key: API_KEY,
                    dates: last30Days,
                    // platforms: '187',
                },
            })
            .then((response) => {
                setGames(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching games:', error);
            });
    }, []);


    const addToWishlist = (game_id) => {
        const user_id = authContext.currentUser.uid;

        axios
            .post('https://capstone-project.ngaiti.repl.co/wishlist', {
                user_id,
                game_id,
            })
            .then(() => {
                setModalSuccess(true);
                setModalMessage('Game added to wishlist successfully');
                setModalVisible(true);
            })
            .catch((error) => {
                setModalSuccess(false);
                setModalMessage('Error adding game to wishlist');
                setModalVisible(true);
                console.error('Error adding game to wishlist:', error);
            });
    };

    useEffect(() => {
        console.log("Game IDs:", games.map(game => game.id));
    }, [games]);

    return (
        <div>
            <h1 className='text-center m-5'>What&apos;s New</h1>
            <GameCard games={games} addToWishlist={addToWishlist} />
            <WishlistModal
                show={modalVisible}
                onClose={() => setModalVisible(false)}
                isSuccess={modalSuccess}
                message={modalMessage}
            />

        </div>
    );
}


