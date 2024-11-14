import classNames from "classnames";


interface PaginationItemProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    page: number;
    isDisabled?: boolean;
  }


export const PaginationItem = ({ page, currentPage, onPageChange, isDisabled }: PaginationItemProps): JSX.Element => {
    const liClasses = classNames({
      "page-item": true,
      active: page === currentPage,
      disabled: isDisabled,
    });
    return (
      <li className={liClasses} onClick={() => onPageChange(page)}>
        <span className="page-link">{page}</span>
      </li>
    );
  };
