
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export interface FilterProps {
    search: string;
    page: string;
}

export const useCharacterFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    const page = searchParams.get("page") || "1";
    const offsetPage = (parseInt(page) * 20) - 20;

    const setCustomFilter = useCallback(
        (filters: FilterProps) => {
            const newParams = new URLSearchParams();

            if (filters.search) {
                newParams.set("search", filters.search);
            }
            if (filters.page) {
                newParams.set("page", filters.page);
            }

            setSearchParams(newParams);
        },
        [setSearchParams]
    );

    const resetFilters = useCallback(() => {
        setSearchParams(new URLSearchParams()); // Reset all params
    }, [setSearchParams]);

    return {
        offsetPage,
        page,
        search,
        setCustomFilter,
        resetFilters,
        searchParams,
    };
};
