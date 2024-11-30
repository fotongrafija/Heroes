import { useState } from "react";
import { Character } from "./useCharacterData";

export const useBookmark = () => {

    const [savedCharacters, setSavedCharacters] = useState<Character[]>([]);

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

  return {
    saveCharacter,
    removeCharacter,
    setSavedCharacters,
    savedCharacters
  }
}
