import { useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed
import { API_KEY, BASE_URL } from '../RAWG'; // Update the path to your API key and base URL
import { FaSearch } from "react-icons/fa";


function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

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

  return (
    <div>
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
      <ul>
        {results.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;

