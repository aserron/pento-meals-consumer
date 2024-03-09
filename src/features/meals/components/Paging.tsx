import React from "react";

export const Paging: React.FC<{
    page: number,
    total: number
    isPlaceholderData: any,
    isFetching: boolean,
    onPrevPage: () => void,
    onNextPage: () => void,
}> = ({page, total, isFetching, isPlaceholderData, onPrevPage, onNextPage}) => {

    return <>
        <span>Current Page: {page + 1}</span><br/>
        <button
            onClick={onPrevPage}
            disabled={page === 0}
        >
            Previous Page
        </button>
        {
            ' | '
        }
        <button
            onClick={onNextPage}
            // Disable the Next Page button until we know a next page is available
            disabled={isPlaceholderData || (page === total - 1)}
        >
            Next Page
        </button>
        {
            isFetching ? <span> Loading...</span> : null
        }{
        ' '
    }
    </>
}
