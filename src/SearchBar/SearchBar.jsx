import { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed
import { API_KEY, BASE_URL } from '../RAWG'; // Update the path to your API key and base URL
import { FaSearch } from "react-icons/fa";
import GameCard from '../components/GameCard';
import GameSortDropdown from '../components/GameSortDropdown';
import PlatformDropdown from '../components/PlatformSortDropdown';
import { AuthContext } from '../components/AuthProvider';


function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [games, setGames] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const authContext = useContext(AuthContext);




  //fetch games
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}games`, {
        params: {
          key: API_KEY,
          search: searchTerm,
        },
      });

      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //fetch platforms
  const fetchPlatforms = async () => {
    try {
      const response = await axios.get(`${BASE_URL}platforms`, {
        params: {
          key: API_KEY,
        },
      });

      setPlatforms(response.data.results);
    } catch (error) {
      console.error('Error fetching platforms:', error);
    }
  };

  const handleResetPlatform = () => {
    setSelectedPlatform(null); // Reset the selected platform
  };


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    fetchData();
  };


  //filter by platform
  const filterByPlatform = () => {
    if (selectedPlatform) {
      const filteredResults = results.filter((game) =>
        game.platforms.some((platform) => platform.platform.name === selectedPlatform)
      );
      setResults(filteredResults);
    } else {
      fetchData();
    }
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
        // Optionally, you can update the local state to reflect the change
      })
      .catch((error) => {
        console.error('Error adding game to wishlist:', error);
      });
  };




  // Function to sort the games based on the current sortBy criteria
  const sortGames = () => {
    let sortedArray = [];

    if (sortBy === 'name') {
      sortedArray = results.concat().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'released') {
      sortedArray = results.concat().sort(
        (a, b) => new Date(b.released) - new Date(a.released)
      );
    } else if (sortBy === 'metacritic') {
      sortedArray = results.concat().sort(
        (a, b) => b.metacritic - a.metacritic
      );
    }

    setResults(sortedArray);
  };

  useEffect(() => {
    sortGames();
    fetchPlatforms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  useEffect(() => {
    filterByPlatform(); // Filter results based on selected platform
  }, [selectedPlatform]); // Run the filter when selectedPlatform changes




  return (
    <>
      <div className="d-flex align-items-center justify-content-center m-5 ">

        <GameSortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        <PlatformDropdown platforms={platforms} setSelectedPlatform={setSelectedPlatform} handleResetPlatform={handleResetPlatform} />
        <input
          type="text"
          placeholder="Search for games"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <FaSearch
          className="mx-3"
          id="search-icon"
          onClick={handleSearch}
          style={{ marginRight: '10px', cursor: 'pointer' }}
        />
      </div>
      <GameCard games={results} addToWishlist={addToWishlist} />
    </>
  );
}

export default SearchBar;

