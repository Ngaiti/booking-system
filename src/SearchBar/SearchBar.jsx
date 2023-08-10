import { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed
import { API_KEY, BASE_URL } from '../RAWG'; // Update the path to your API key and base URL
import { FaSearch } from "react-icons/fa";
import GameCard from '../components/GameCard';
import GameSortDropdown from '../components/GameSortDropdown';


function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [games, setGames] = useState([]);
  const [sortBy, setSortBy] = useState('name');




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

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    fetchData();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  return (
    <div>
      <GameSortDropdown sortBy={sortBy} setSortBy={setSortBy} />

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
      <GameCard games={results} />
    </div>
  );
}

export default SearchBar;

