
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar"
import { useCharacterData } from "./hooks/useCharacterData";
import { useDebounce } from "./hooks/useDebounce";
import { CharacterCard } from "./components/CharacterCard";
import { Character } from "./hooks/useCharacterData";
import { LoadingLayout } from "./layouts/LoadingLayout";
import { PaginationComponent } from "./components/PaginationComponent";
import { useCharacterFilter } from "./hooks/useCharacterFilter";
import { useBookmark } from "./hooks/useBookmark";


function App() {
	const { characterData, loading, fetchCharacterData, setOffsetParam } = useCharacterData();

	const { saveCharacter, removeCharacter, savedCharacters, setSavedCharacters } = useBookmark();

	const { search, setCustomFilter, resetFilters } = useCharacterFilter()

	const [characterName, setCharacterName] = useState<string>(search);
	const debouncedSearch = useDebounce(characterName, 1000)

	useEffect(() => {
		// Load saved characters from localStorage on component mount
		const saved = localStorage.getItem('savedCharacters');
		if (saved) {
			setSavedCharacters(JSON.parse(saved) as Character[]);
		}
	}, [setSavedCharacters]);

	// Fetchin data
	useEffect(() => {

		fetchCharacterData(debouncedSearch)

	}, [debouncedSearch, fetchCharacterData])

	

	const handlePageChange = (newOffset: number) => {
		setOffsetParam(newOffset)
	}


	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value;

		if (searchTerm === "") {
			resetFilters(); // Params reset
		} else {
			setCustomFilter({
				search: searchTerm,
				page: "1",
			});
		}

		setCharacterName(searchTerm);
		setOffsetParam(0);
	};

	console.log(characterData)
	console.log(characterName)

	return (
		<>
			{loading && <LoadingLayout />}

			<SearchBar onChange={handleSearchChange} value={characterName} />

			{characterData && <CharacterCard data={characterData.results} onAction={(character: Character) => { saveCharacter(character) }} />}
			{!characterData && savedCharacters.length > 0 &&
				<div>
					<CharacterCard data={savedCharacters} onAction={(character) => removeCharacter(character.id)} />
				</div>
			}

			{characterData && characterData.offset >= 0 && characterData.total > 20 &&
				<PaginationComponent
					total={characterData.total}
					offset={characterData.offset}
					limit={characterData.limit}
					onChange={handlePageChange} />}

		</>
	)
}

export default App



