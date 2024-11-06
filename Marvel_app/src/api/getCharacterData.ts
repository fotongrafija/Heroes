import { generateHash } from "../utils/generateHash"
import { publicKey } from "../utils/generateHash"

export const getCharacterData = (characterName: string) => {

    const timeStamp = new Date().getTime()
    const hash = generateHash(timeStamp)
    
    const url = `http://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith${characterName}&limit=100`

    fetch(url)
        .then((response) => response.json())
        .then((result) => result.data)
        .catch((error) => console.log(error))
}