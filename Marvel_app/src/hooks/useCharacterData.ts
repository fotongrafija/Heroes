import { useState } from "react"
import { generateHash } from "../utils/generateHash"
import { publicKey } from "../utils/generateHash"

const API_URL = import.meta.env.VITE_API_URL

export const useCharacterData = () => {
    const [characterData, setCharacterData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [offsetParam, setOffsetParam] = useState(0)

    const fetchCharacterData = async (characterName: string) => {
        
        // setLoading(true)// loading mi refresuje stranicu

        

        setError(null)

        try {
            const ts = new Date().getTime()
            const hash = generateHash(ts)
            const url = `${API_URL}${publicKey}&hash=${hash}&ts=${ts}&nameStartsWith=${characterName}&offset=${offsetParam}&limit=20`

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
        fetchCharacterData,
        setOffsetParam,
        offsetParam
    }
}



