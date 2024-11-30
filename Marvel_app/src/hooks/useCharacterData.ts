import { useState, useCallback } from "react"
import { getApiUrl } from "../utils/getApiUrl"
import { useCharacterFilter } from "./useCharacterFilter";


export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

export interface Response {
    results: Character[];
    total: number;
    offset: number;
    limit: number;
}

interface Error {
    event: unknown
}


export const useCharacterData = () => {
    const [characterData, setCharacterData] = useState<Response>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error>()
    const { offsetPage } = useCharacterFilter()
    const [offsetParam, setOffsetParam] = useState(parseInt(offsetPage.toString()))
   
    
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



