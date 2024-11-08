
import "../styles/searchBar.scss"



interface SearchBarProps {
  onChange: (value: string) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <div className='search'>
      <input type="text"
        placeholder='Type character name...'
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
