
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar"
import { useCharacterData } from "./hooks/useCharacterData";
import { useDebounce } from "./hooks/useDebounce";
import { CharacterCard } from "./components/CharacterCard";

function App() {
  const { characterData, loading, fetchCharacterData, setOffsetParam, offsetParam } = useCharacterData();
  const [characterName, setCharacterName] = useState<string>('');
  const [savedCharacters, setSavedCharacters] = useState<any[]>([]);
  const debouncedSearch = useDebounce(characterName, 1000)

  useEffect(() => {
    // Load saved characters from localStorage on component mount
    const saved = localStorage.getItem('savedCharacters');
    if (saved) {
      setSavedCharacters(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const loadCharacter = async () => {
      await fetchCharacterData(characterName)
    }
    loadCharacter()
  }, [debouncedSearch])

  const saveCharacter = (character: any) => {
    const updatedSavedCharacters = [...savedCharacters, character];
    setSavedCharacters(updatedSavedCharacters);
    localStorage.setItem('savedCharacters', JSON.stringify(updatedSavedCharacters));
  }

  const removeCharacter = (characterId: string) => {
    const filteredCharacters = savedCharacters.filter(char => char.id !== characterId);
    setSavedCharacters(filteredCharacters);
    localStorage.setItem('savedCharacters', JSON.stringify(filteredCharacters));
  }

  console.log(characterData)
  return (
    <>
      {loading ? <div>Loading...</div> :
        <SearchBar onChange={(name: string) => setCharacterName(name)} />
      }
      {!loading && characterData && <CharacterCard data={characterData.results} onSave={(character: object) => saveCharacter(character)} />}
      {!loading && !characterData && savedCharacters.length > 0 &&
        <div>
          <CharacterCard data={savedCharacters} onRemove={(id: number) => removeCharacter(id)} />
        </div>
      }
    </>
  )
}

export default App



