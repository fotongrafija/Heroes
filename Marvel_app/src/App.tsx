import { useState } from "react";
import SearchBar from "./components/SearchBar"
import { getCharacterData } from "./api/getCharacterData";

function App() {

  const [skipCharacters, setSkipCharacters] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (value: string) => {
    // search functionality
    
    setSearchQuery(value)
    
    getCharacterData(searchQuery)
  };

  return (
    <>
      <SearchBar onChange={handleSearch} />
    </>
  )
}

export default App
