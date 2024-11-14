


export const pagesRange = (start: number, end: number): number[] => {
    return [...Array(end - start).keys()].map((el) => el + start);
};
