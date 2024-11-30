import { useMemo } from "react";


interface PagesCutResult {
	start: number;
	end: number;
}
// @param totalPages - is a value we make dividing total and limit we get from server
// @param pagesCutCount - is a value of how many pages we want to show in pagination component
export const useGetPagesCut = (totalPages: number, pagesCutCount: number, currentPage: number): PagesCutResult => {


	return useMemo(() => {


		const begining = Math.floor(pagesCutCount / 2); // <begining> will be half of <pagesCutCount> but that whole number. In case of number 5 this will be 2
		const ending = Math.ceil(pagesCutCount / 2);     // <ending> will be half of <pagesCutCount> but next number. In case of number 5 this will be 3


		// If total number of pages is less than the number of pages we want to show in pagination
		if (totalPages < pagesCutCount) {
			// Return range from first page to last available page (<totalPages> + 1 because end is exclusive with <pagesRange> function)
			return { start: 1, end: totalPages + 1 };
		}
		// If we're on pages 1 to 3 (when <pagesCutCount> is 5)
		else if (currentPage >= 1 && currentPage <= ending) {
			// Show first set of pages from 1 to <pagesCutCount>
			return { start: 1, end: pagesCutCount + 1 };
		}
		// If we're near the end (<currentPage> + <beginning> >= <totalPages>)
		else if (currentPage + begining >= totalPages) {
			// Show last set of pages, from (<totalPages> - <pagesCutCount>) to end
			return { start: totalPages - pagesCutCount + 1, end: totalPages + 1 };
		}
		// If we're somewhere in the middle
		else {
			// Show pages centered around current page
			// Start is (<currentPage> - <ending> + 1) to show some pages before current
			// End is (<currentPage> + <beginning> + 1) to show some pages after current
			return { start: currentPage - ending + 1, end: currentPage + begining + 1 };
		}
	}, [totalPages, pagesCutCount, currentPage])
};

