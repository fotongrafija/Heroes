import { useState, useCallback } from "react"
import { generateHash } from "../utils/generateHash"
import { publicKey } from "../utils/generateHash"

const API_URL = import.meta.env.VITE_API_URL
const CHARACTERS_PATH = 'v1/public/characters'

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
            const ts = new Date().getTime()
            const hash = generateHash(ts)
            // const url = `${API_URL}${publicKey}&hash=${hash}&ts=${ts}&nameStartsWith=${characterName}&offset=${offsetParam}&limit=20`

            const url = new URL(API_URL)
            url.pathname = CHARACTERS_PATH
            url.searchParams.append('apikey', publicKey)
            url.searchParams.append('nameStartsWith', characterName)
            url.searchParams.append('hash', hash)
            url.searchParams.append('ts', ts.toString())
            url.searchParams.append('offset', offsetParam.toString())
            url.searchParams.append('limit', '20')

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



