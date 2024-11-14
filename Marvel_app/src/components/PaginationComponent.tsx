
import React from 'react';
import { pagesRange } from '../utils/pagesRange';
import { PaginationItem } from './PaginationItem';
import { getPagesCut } from '../utils/getPagesCut';
import '../styles/pagination.scss'

export interface PaginationProps {
    total: number;
    offset: number;
    limit: number;
    onChange: (newOffset: number) => void;

}



export const PaginationComponent: React.FC<PaginationProps> = ({ total, offset, limit, onChange }) => {
    const totalPages = Math.ceil(total / limit);

    const currentPage = Math.floor(offset / limit) + 1;
    const pagesCut = getPagesCut({ totalPages, pagesCutCount: 10, currentPage });
    const pages = pagesRange(pagesCut.start, pagesCut.end)
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePageChange = (page: number) => {
        
        const newOffset = (page - 1) * limit;
        onChange?.(newOffset);
    };

    
    return (
        <div className="pagination-wrapper">
            <ul className="pagination">
                {!isFirstPage && 
                <PaginationItem
                    page="First"
                    currentPage={currentPage}
                    onPageChange={() => handlePageChange(1)}
                    isDisabled={isFirstPage}
                />}
                {!isFirstPage &&
                <PaginationItem
                    page="Prev"
                    currentPage={currentPage}
                    onPageChange={() => handlePageChange(currentPage - 1)}
                    isDisabled={isFirstPage}
                />}
                {pages.map((page) => (
                    <PaginationItem
                        page={page}
                        key={page}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                ))}
                {!isLastPage && 
                <PaginationItem
                    page="Next"
                    currentPage={currentPage}
                    onPageChange={() => handlePageChange(currentPage + 1)}
                    isDisabled={isLastPage}
                />}
                {!isLastPage && 
                <PaginationItem
                    page="Last"
                    currentPage={currentPage}
                    onPageChange={() => handlePageChange(pages.length)}
                    isDisabled={isLastPage}
                />}
            </ul>
        </div>

    );
}
