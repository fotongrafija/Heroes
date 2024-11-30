

import { useMemo } from 'react';
import { pagesRange } from '../utils/pagesRange';
import { PaginationItem } from './PaginationItem';
import { useGetPagesCut } from '../utils/getPagesCut';
import '../styles/pagination.scss'
import { useCharacterFilter } from '../hooks/useCharacterFilter';


export interface PaginationProps {
    total: number;
    limit: number;
    offset: number;
    onChange: (newOffset: number) => void;
}

// @param total = characterData.total
// @param limit = characterData.limit
//
export const PaginationComponent = ({ total, limit, onChange }: PaginationProps) => {

    // custom hook for controlling URL state
    const { setCustomFilter, page } = useCharacterFilter();

    const totalPages = useMemo(() => Math.ceil(total / limit), [limit, total]);

    const currentPage = useMemo(() => page ? parseInt(page) : 1, [page]);

    const pagesCut = useGetPagesCut(totalPages, 5, currentPage);

    const pages = useMemo(() => pagesRange(pagesCut.start, pagesCut.end), [pagesCut.end, pagesCut.start]);

    const isFirstPage = useMemo(() => currentPage === 1, [currentPage]);

    const isLastPage = useMemo(() => currentPage === totalPages, [currentPage, totalPages]);



    const handlePageChange = (page: number) => {
        const newOffset = (page - 1) * limit;

        setCustomFilter({
            page: page.toString(),
            search: '',
        });

        onChange(newOffset);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="pagination-wrapper">
            <div className="pagination">
                {
                    <PaginationItem
                        page="First"
                        currentPage={currentPage}
                        onPageChange={() => handlePageChange(1)}
                        isDisabled={isFirstPage}
                    />}
                {
                    <PaginationItem
                        page="Prev"
                        currentPage={currentPage}
                        onPageChange={() => handlePageChange(currentPage - 1)}
                        isDisabled={isFirstPage}
                    />}
                {pages.map((_page) => (
                    <PaginationItem
                        page={_page.toString()}
                        key={_page}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                ))}
                {
                    <PaginationItem
                        page="Next"
                        currentPage={currentPage}
                        onPageChange={() => handlePageChange(currentPage + 1)}
                        isDisabled={isLastPage}
                    />}
                {
                    <PaginationItem
                        page="Last"
                        currentPage={currentPage}
                        onPageChange={() => handlePageChange(totalPages)}
                        isDisabled={isLastPage}
                    />}
            </div>
        </div>
    );
}

