

interface PagesCutProps {
    totalPages: number;
    pagesCutCount: number;
    currentPage: number;
}

interface PagesCutResult {
    start: number;
    end: number;
}

export const getPagesCut = ({ totalPages, pagesCutCount, currentPage }: PagesCutProps): PagesCutResult => {
    const ceiling = Math.ceil(pagesCutCount / 2);
    const floor = Math.floor(pagesCutCount / 2);
    console.log("ceiling", ceiling);
    console.log("floor", floor);
  
    if (totalPages < pagesCutCount) {
      return { start: 1, end: totalPages + 1 };
    } else if (currentPage >= 1 && currentPage <= ceiling) {
      return { start: 1, end: pagesCutCount + 1 };
    } else if (currentPage + floor >= totalPages) {
      return { start: totalPages - pagesCutCount + 1, end: totalPages + 1 };
    } else {
      return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
    }
};
