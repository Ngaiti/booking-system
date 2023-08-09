import { useState } from "react";

import "./App.css";
import { SearchResultsList } from "./SearchResultsList";
import SearchBar from "./SearchBar";

function Search() {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </div>
  );
}

export default Search;
