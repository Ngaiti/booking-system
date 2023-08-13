import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../RAWG';
import { auth } from '../firebase';
import GameCard from '../components/GameCard';
import { AuthContext } from '../components/AuthProvider';

export default function Wishlist() {
    const [wishlistGames, setWishlistGames] = useState([]);
    const [fetchedGames, setFetchedGames] = useState([]);
    const [showNoGamesMessage, setShowNoGamesMessage] = useState(false);

    const authContext = useContext(AuthContext); // Use the AuthContext


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const userUID = user.uid;
                fetchWishlist(userUID);
            }
        });

        return () => unsubscribe();
    }, []);


    const fetchWishlist = (userUID) => {
        axios
            .get(`https://capstone-project.ngaiti.repl.co/wishlist`, {
                params: {
                    user_id: userUID,
                    ordering: '-created_at',
                },
            })
            .then((response) => {
                const wishlistItems = response.data.data;
                const gameIds = wishlistItems.map(item => item.game_id);

                axios
                    .get(`${BASE_URL}games`, {
                        params: {
                            key: API_KEY,
                            ids: gameIds.join(','),
                        },
                    })
                    .then((response) => {
                        setFetchedGames(response.data.results);
                    })
                    .catch((error) => {
                        console.error('Error fetching matching games:', error);
                    });

                setWishlistGames(wishlistItems);
            })
            .catch((error) => {
                console.error('Error fetching wishlist:', error);
            });
    };

    const handleDelete = (item_id) => {
        console.log('Deleting item:', authContext.currentUser.uid, item_id);
        axios
            .delete(`https://capstone-project.ngaiti.repl.co/wishlist/${authContext.currentUser.uid}/${item_id}`)
            .then(() => {
                console.log('Item deleted successfully');
                setWishlistGames(prevWishlist => prevWishlist.filter(item => item.id !== item_id));
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error deleting wishlist item:', error);
            });
    };



    useEffect(() => {
        if (fetchedGames.length === 0) {
            const timeoutId = setTimeout(() => {
                setShowNoGamesMessage(true);
            }, 3000);

            return () => clearTimeout(timeoutId);
        }
    }, [fetchedGames]);

    return (
        <div>
            <h1 className='text-center m-2'>Your Wishlist</h1>
            {fetchedGames.length > 0 ? (
                <GameCard games={fetchedGames} onDelete={handleDelete} showDeleteButton={true} />
            ) : (
                showNoGamesMessage ? <p>No games in your wishlist.</p> : null
            )}
        </div>
    );
}

