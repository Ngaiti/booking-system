import { useState } from 'react';
import { Button } from 'react-bootstrap';

function AddWishlist({ games, onAddToWishlist }) {
    const [wishlist, setWishlist] = useState([]);

    const handleAddToWishlist = (game) => {
        if (!wishlist.some(item => item.id === game.id)) {
            setWishlist([...wishlist, game]);
            onAddToWishlist(game);
        }
    };

    return (
        <div>
            <h2>My Wishlist</h2>
            {games.map(game => (
                <div key={game.id}>
                    {game.name}
                    <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleAddToWishlist(game)}
                        disabled={wishlist.some(item => item.id === game.id)}
                    >
                        Add to Wishlist
                    </Button>
                </div>
            ))}
        </div>
    );
}

export default AddWishlist;