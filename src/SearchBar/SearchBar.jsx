import { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed
import { API_KEY, BASE_URL } from '../RAWG'; // Update the path to your API key and base URL
import { FaSearch } from "react-icons/fa";
import GameCard from '../components/GameCard';
import GameSortDropdown from '../components/GameSortDropdown';
import PlatformDropdown from '../components/PlatformSortDropdown';
import { AuthContext } from '../components/AuthProvider';
import WishlistModal from '../components/WishlistModal';


function SearchBar() {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [filteredResults, setFilteredResults] = useState(results);


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
      setFilteredResults(filteredResults);
    } else {
      setFilteredResults(results);
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



  // sort games based on the current sortBy criteria
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
    fetchData();
    fetchPlatforms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sortGames();
    fetchPlatforms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  useEffect(() => {
    filterByPlatform();
  }, [results, selectedPlatform, sortBy]);


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
      <GameCard games={filteredResults} addToWishlist={addToWishlist} />
      <WishlistModal
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        isSuccess={modalSuccess}
        message={modalMessage}
      />
    </>
  );
}

export default SearchBar;

