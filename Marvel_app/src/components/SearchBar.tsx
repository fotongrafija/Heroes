
import '../styles/searchBar.css'
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onChange: (value: string) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <div className='search-wrapper'>
      <FaSearch color={'red'} size={20} />

      <input type="text"
        placeholder='Type character name...'
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
