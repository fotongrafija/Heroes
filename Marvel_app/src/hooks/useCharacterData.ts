import { useState } from "react"
import { generateHash } from "../utils/generateHash"
import { publicKey } from "../utils/generateHash"

export const useCharacterData = () => {
    const [characterData, setCharacterData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const fetchCharacterData = async (characterName: string) => {
        
        setLoading(true)
        setError(null)

        try {
            const ts = new Date().getTime()
            const hash = generateHash(ts)
            const url = `http://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${ts}&nameStartsWith=${characterName}&limit=100`

            const response = await fetch(url)
            const payload = await response.json()
            setCharacterData(payload.data)
            setLoading(false)
        }
        catch (e: unknown) {
            setError(e)
            setLoading(false)
        }
    }

    return {
        characterData,
        loading,
        error,
        fetchCharacterData
    }
}



