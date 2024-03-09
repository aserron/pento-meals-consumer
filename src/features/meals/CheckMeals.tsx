import React, {useCallback, useEffect, useState} from 'react';
import {Meal} from "../../hooks/meals/Meal.types";
import Pager from "../../components/Pager/Pager";
import {FilterBar} from "../../components/filter/FilterBar";
import useMeals from "../../hooks/meals/useMeals";
import RefreshSelect from "../config/RefreshSelect";
import {SearchInput} from "./components/SearchInput";
import {Paging} from "./components/Paging";

const CheckMeals: React.FC<{}> = (props) => {

    const [page, setPage] = React.useState(0);
    const [word, setWord] = useState('');

    const [refreshInterval, setRefreshInterval] = useState(1000);

    const {
        isPending,
        isError,
        error,
        data,
        isFetching,
        isPlaceholderData
    } = useMeals(word, page, refreshInterval);


    // each new fetching we return to page 1 (index 0)
    useEffect(() => {
        setPage(0);
    }, [data])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setWord((p) => e.target.value)
    }, [])


    // callback will be kept
    const handlePageClick = useCallback((event: React.MouseEvent<HTMLUListElement>) => {

        const data = event.target as HTMLUListElement;

        // console.dir(data);

        // another proper testing.
        // data.classList.contains('page-link')

        if (!!data && data.tagName === 'LI') {
            setPage(parseInt(data.dataset.id as string) - 1)
        }
    }, []);

    let isEmpty = (data?.meals === null);

    if (isPending) {
        return (<>
            <input type={"text"} onChange={handleChange}/>
            <hr/>
            <div>Loading...</div>
        </>)
    }

    if (isError) {
        return <>
            <input type={"text"} onChange={handleChange}/>
            <hr/>
            <div>Error! {(error !== null) ? error.message : ''}</div>
        </>
    }


    // pager logic
    const pageSize = 3;
    const total = Math.ceil(data.meals.length / pageSize);
    const offSet = page * pageSize;
    const filtered = data.meals.slice(offSet, offSet + pageSize);

    const handlePrevPage = () => {
        setPage((prevState: number) => Math.max(prevState - 1, 0))
    };
    const handleNextPage = () => {
        if (!isPlaceholderData && (page < total - 1)) {
            setPage((old: any) => parseInt(old) + 1)
        }
    }

    function handleOnChange(interval: number) {
        setRefreshInterval(interval)
    }

    return (
        <>
            <Pager onClick={handlePageClick} total={total} current={page + 1}/>
            <hr/>
            <RefreshSelect isFetching={isFetching} onChange={handleOnChange}/>
            <hr/>
            <SearchInput onChange={handleChange}/>
            <hr/>
            <FilterBar/>
            <hr/>
            <Paging {...{
                page,
                total,
                isFetching,
                isPlaceholderData,
                onNextPage:handleNextPage,
                onPrevPage:handlePrevPage}
            }/>
            <div>
                {isEmpty ? (
                    <div>No Results</div>
                ) : (
                    <div>
                        {filtered.map((meal: Meal) => (
                            <p key={meal.idMeal}>{meal.strMeal}</p>
                        ))}
                    </div>
                )
                }

            </div>
        </>


    )

}

CheckMeals.propTypes = {};

export default CheckMeals;
