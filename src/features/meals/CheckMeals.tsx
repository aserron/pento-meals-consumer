import React, {useCallback, useEffect, useState} from 'react';
import {keepPreviousData, useQuery, useQueryClient} from "@tanstack/react-query";
import {Meal} from "../../hooks/meals/Meal.types";
import Pager from "../../components/Pager/Pager";
import {FilterBar} from "../../components/filter/FilterBar";
import useMeals from "../../hooks/meals/useMeals";
import RefreshSelect from "../config/RefreshSelect";

const fetchMealsByName = async (word = '', page = 0) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`
    return fetch(url + `&page=${page}`).then((res) => res.json())
}

function SearchInput(props: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return <input type={"text"} onChange={props.onChange}/>;
}

const CheckMeals: React.FC<{}> = (props) => {

    const [page, setPage] = React.useState(0);
    const [word, setWord] = useState('');

    // const queryClient = useQueryClient();
    // queryClient.invalidateQueries({
    //     queryKey: ['projects', word],
    //     exact: true,
    //     type: 'inactive', // only invalidate inactive queries
    //     refetchType: 'none' // dont refetch until needed
    // })
    // const {
    //     isPending,
    //     isError,
    //     error,
    //     data,
    //     isFetching,
    //     isPlaceholderData
    // } = useQuery({
    //     queryKey: ['projects', word],
    //     queryFn: () => fetchMealsByName(word),
    //     placeholderData: keepPreviousData,
    //     refetchInterval: 1000 * 10,
    // })


    const [refreshInterval, setRefreshInterval] = useState(1000);
    
    const {
            isPending,
            isError,
            error,
            data,
            isFetching,
            isPlaceholderData
        } = useMeals(word,page,refreshInterval);


    useEffect(() => {
        setPage(0);
    }, [data])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setWord((p) => e.target.value)
    }, [])


    // install in ul, catch all and filter by current el clicked.
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
            <div>Error! {(error!==null) ? error.message:''}</div>
        </>
    }


    // pager logic
    const pageSize = 3;
    const total = Math.ceil(data.meals.length / pageSize);
    const offSet = page * pageSize;
    const filtered = data.meals.slice(offSet, offSet + pageSize);

    const Pagging = () => {
        return <>
            <span>Current Page: {page + 1}</span><br/>
            <button
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 0}
            >
                Previous Page
            </button>
            {
                ' | '
            }
            <button
                onClick={() => {
                    if (!isPlaceholderData && (page < total - 1)) {
                        setPage((old: any) => parseInt(old) + 1)
                    }
                }}
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


    function handleOnChange(interval:number) {
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
            <FilterBar />
            <hr/>
            <Pagging/>
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
