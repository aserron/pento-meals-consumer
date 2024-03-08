import React from "react";
import "./Pager.css";

function getCurrentStyle(curr: number, page: any) {
    //console.log([curr, page]);
    return (page) == (curr) ? ' current' : '';
}

const Pager: React.FC<{
    total: number,
    current: number,
    onClick?: (e: React.MouseEvent<HTMLUListElement>) => void
}> = function ({onClick, total = 0, current = 0}) {

    // create the page elements
    const pages = [];
    for (let i = 1; i <= total; i++) {
        pages.push(i);
    }

    return (<>
        <ul onClick={onClick} className={`pager-link-ct`}>
            {pages.map(page => (
                <li
                    key={`pag-${total}-${page}`}
                    data-id={page}
                    className={`pager-link${getCurrentStyle(current, page)}`}>{page}</li>
            ))}
        </ul>

    </>);
}

export default Pager;
