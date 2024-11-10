import { useState, useCallback } from "react"
import { getApiUrl } from "../utils/getApiUrl"

export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

interface Response {
    results: Character[]
}

interface Error {
    event: unknown
}


export const useCharacterData = () => {
    const [characterData, setCharacterData] = useState<Response>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error>()
    const [offsetParam, setOffsetParam] = useState(0)

    const fetchCharacterData = useCallback(async (characterName: string) => {

        setLoading(true)
        
        try {
            const url = getApiUrl({ characterName, offsetParam })

            const response = await fetch(url)
            const payload = await response.json()

            setCharacterData(payload.data as Response)
            setLoading(false)
        }
        catch (event) {
            setError(event as Error)
            setLoading(false)
        }
    }, [offsetParam])

    return {
        characterData,
        loading,
        error,
        fetchCharacterData,
        setOffsetParam,
        offsetParam
    }
}



