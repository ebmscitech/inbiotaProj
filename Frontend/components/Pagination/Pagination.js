import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

const Pagination = ({
    page,
    totalPages,
    totalDocs,
    onNumberClick,
}) => {
    const [loopingNumber, setLoopingNumber] = useState([]);
    const currentPaginationStyle = "relative z-10 inline-flex items-center bg-primary-500 px-4 py-2 text-sm font-semibold text-w-50 dark:bg-white dark:text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600";
    const paginationStyle = "cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-primary-200 dark:ring-white hover:bg-gray-50 focus:z-20 focus:outline-offset-0";

    useEffect(() => {
        let loopingTemp = [];
        for (let i = 1; i <= totalPages; i++) {
            loopingTemp.push(i);
        }
        setLoopingNumber([...loopingTemp]);
    }, [totalPages]);

    return (
        <div className="flex items-center justify-between rounded bg-white dark:bg-boxdark px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-50 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <span
                            onClick={() => {
                                if (page > 1 && onNumberClick) {
                                    onNumberClick(page - 1);
                                }
                            }}
                            className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-primary-200 dark:ring-white hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <svg
                                className="h-5 w-5 bg-red-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        {/* {loopingNumber.map((currentNumber) => {
                            if (
                                (totalPages >= 10 && currentNumber <= 3) ||
                                (totalPages < 10 && currentNumber <= totalPages)
                            ) {
                                return (
                                    <span
                                        key={`page${currentNumber}`}
                                        onClick={() => {
                                            onNumberClick(currentNumber);
                                        }}
                                        className={
                                            currentNumber === page
                                                ? currentPaginationStyle
                                                : paginationStyle
                                        }
                                    >
                                        {currentNumber}
                                    </span>
                                );
                            }
                        })} */}
                        {loopingNumber.map((currentNumber) => {
                            if (
                                (currentNumber <= 3) || // First 3 pages
                                (currentNumber >= totalPages - 2) || // Last 2 pages
                                (currentNumber >= page - 1 && currentNumber <= page + 1) // Page +1 and -1 around current
                            ) {
                                return (
                                    <span
                                        key={`page${currentNumber}`}
                                        onClick={() => {
                                            onNumberClick(currentNumber);
                                        }}
                                        className={
                                            currentNumber === page
                                                ? currentPaginationStyle
                                                : paginationStyle
                                        }
                                    >
                                        {currentNumber}
                                    </span>
                                );
                            } else if (
                                (currentNumber === 4 && page < totalPages - 2) ||
                                (currentNumber === totalPages - 3 && page > 2)
                            ) {
                                // Show a break in pagination if applicable
                                return (
                                    <span
                                        key={`pageBreak${currentNumber}`}
                                        onClick={() => {
                                            if (page < totalPages && onNumberClick) {
                                                onNumberClick(page + 1);
                                            }
                                        }}
                                        className="relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-primary-200 dark:ring-white focus:outline-offset-0"
                                    >
                                        ...
                                    </span>
                                );
                            }
                        })}

                        {/* {(page < 3 || page > totalPages - 2) && totalPages >= 10 ? (
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-primary-200 dark:ring-white focus:outline-offset-0">
                                ...
                            </span>
                        ) : (
                            <Fragment>
                                {loopingNumber.map((currentNumber) => {
                                    if (
                                        currentNumber > 3 &&
                                        currentNumber < page + 4 &&
                                        currentNumber > page - 4 &&
                                        currentNumber < totalPages - 2 &&
                                        totalPages >= 10
                                    )
                                        return (
                                            <span
                                                key={`page${currentNumber}`}
                                                onClick={() => {
                                                    onNumberClick(currentNumber);
                                                }}
                                                className={
                                                    currentNumber === page
                                                        ? currentPaginationStyle
                                                        : paginationStyle
                                                }
                                            >
                                                {currentNumber}
                                            </span>
                                        );
                                })}
                            </Fragment>
                        )} */}

                        {/* {loopingNumber.map((currentNumber) => {
                            if (currentNumber > totalPages - 3 && totalPages >= 10)
                                return (
                                    <span
                                        key={`page${currentNumber}`}
                                        onClick={() => {
                                            onNumberClick(currentNumber);
                                        }}
                                        className={
                                            currentNumber === page
                                                ? currentPaginationStyle
                                                : paginationStyle
                                        }
                                    >
                                        {currentNumber}
                                    </span>
                                );
                        })} */}
                        <span
                            onClick={() => {
                                if (page < totalPages && onNumberClick) {
                                    onNumberClick(page + 1);
                                }
                            }}
                            className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-primary-200 dark:ring-white hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </nav>
                </div>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalDocs: PropTypes.number.isRequired,
    onNumberClick: PropTypes.func.isRequired,
};

export default Pagination;
