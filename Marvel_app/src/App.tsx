
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar"
import { useCharacterData } from "./hooks/useCharacterData";
import { useDebounce } from "./hooks/useDebounce";
import { CharacterCard } from "./components/CharacterCard";
import { Character } from "./hooks/useCharacterData";
import { LoadingLayout } from "./layouts/LoadingLayout";
import { PaginationComponent } from "./components/PaginationComponent";



function App() {
  const { characterData, loading, fetchCharacterData, setOffsetParam } = useCharacterData();
  const [characterName, setCharacterName] = useState<string>('');
  const [savedCharacters, setSavedCharacters] = useState<Character[]>([]);
  const debouncedSearch = useDebounce(characterName, 1000)

  useEffect(() => {
    // Load saved characters from localStorage on component mount
    const saved = localStorage.getItem('savedCharacters');
    if (saved) {
      setSavedCharacters(JSON.parse(saved) as Character[]);
    }
  }, []);

  useEffect(() => {
    const loadCharacter = async () => {
      await fetchCharacterData(debouncedSearch)
    }
    loadCharacter()
  }, [debouncedSearch, fetchCharacterData])

  const saveCharacter = (character: Character) => {
    if (savedCharacters.some((c: Character) => c.id === character.id)) {
      return;
    }
    const updatedSavedCharacters = [...savedCharacters, character];
    setSavedCharacters(updatedSavedCharacters);
    localStorage.setItem('savedCharacters', JSON.stringify(updatedSavedCharacters));
  }

  const removeCharacter = (characterId: number) => {
    const filteredCharacters = savedCharacters.filter(char => char.id !== characterId);
    setSavedCharacters(filteredCharacters);
    localStorage.setItem('savedCharacters', JSON.stringify(filteredCharacters));
  }

  const handlePageChange = (newOffset: number) => {

    setOffsetParam(newOffset)
  }

  console.log(characterData)

  return (
    <>
      {loading && <LoadingLayout />}

      <SearchBar onChange={(name: string) => setCharacterName(name)} />

      {characterData && <CharacterCard data={characterData.results} onAction={(character: Character) => { saveCharacter(character) }} />}
      {!characterData && savedCharacters.length > 0 &&
        <div>
          <CharacterCard data={savedCharacters} onAction={(character) => removeCharacter(character.id)} />
        </div>
      }

      {characterData && characterData.total > 20 &&
        <PaginationComponent
          total={characterData.total}
          offset={characterData.offset}
          limit={characterData.limit}
          onChange={handlePageChange} />}

    </>
  )
}

export default App



