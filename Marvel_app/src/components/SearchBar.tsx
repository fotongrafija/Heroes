/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { FaSearch } from 'react-icons/fa'
import { debounce } from 'lodash'

import '../styles/searchBar.css'

interface SearchBarProps {
  onChange: (text: string) => void;
}







const SearchBar = ({ onChange }: SearchBarProps) => {

  const [characterName, setCharacterName] = useState<string>('');

  const debouncedSearch = useCallback(debounce((text: string) => {
    onChange(text);
  }, 300), [onChange]
  );

  useEffect(() => {
    debouncedSearch?.(characterName);
  }, [characterName]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacterName(e.target.value)
  }

  return (
    <div className='search-wrapper'>
      <FaSearch id='search-icon' size={20} />
      <input value={characterName} type="text" placeholder='Type character name...' onChange={handleChange} />
    </div>
  )
}

export default SearchBar
