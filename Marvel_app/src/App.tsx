import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar"
import { useCharacterData } from "./hooks/useCharacterData";
import { useDebounce } from "./hooks/useDebounce";

function App() {

  const [skipCharacters, setSkipCharacters] = useState<number>(0);

  const { characterData, loading, fetchCharacterData } = useCharacterData();


  const [characterName, setCharacterName] = useState<string>('');
  const debouncedSearch = useDebounce(characterName, 1000)

  useEffect(() => {
    const loadCharacter = async () => {

      await fetchCharacterData(characterName)

    }
    loadCharacter()
  }, [debouncedSearch])

  console.log(characterData)
  return (
    <>
      {loading ? <div>Loading...</div> :
        <SearchBar onChange={setCharacterName} />
      }
      <div className="container">
        {characterData?.results?.map((character: any) => (
          <div key={character.id} className="character-card">
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <h2>{character.name}</h2>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
