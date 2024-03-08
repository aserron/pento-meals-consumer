import axios, {AxiosError} from "axios";
import {Meal} from "./Meal.types";

import '@tanstack/react-query'
import {
    keepPreviousData,
    QueryClient,
    QueryFunction,
    queryOptions,
    useQuery,
    useQueryClient
} from "@tanstack/react-query";


type Meals = ReadonlyArray<Meal>
type FetchMealsByNameResponse = Promise<{ meals: Meals }>
type QueryKey = [string, { search: string, page: number }];

const fetchMealsByName = async (word = '', page = 0) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`+`&page=${page}`
    return fetch(url).then((res) => res.json())
}

function groupOptions(word: string, ri:number) {
    const opt = queryOptions({
            queryKey: ['meals', word],
            queryFn: () => fetchMealsByName(word),
            placeholderData: keepPreviousData,
            refetchInterval: ri || (1000 * 10),
        });
    console.info(opt)
    return opt;
}

export const useMeals = (word: string, page: number, refreshInterval:number) => {

    const queryClient = useQueryClient();

    queryClient.invalidateQueries({
        queryKey: ['meals', word],
        exact: true,
        type: 'inactive', // only invalidate inactive queries
        refetchType: 'none' // dont refetch until needed
    })

    const {
        status,
        isPending,
        isError,
        error,
        data,
        isFetching,
        isPlaceholderData
    } = useQuery(groupOptions(word,refreshInterval))

    

    return {
        isPending,
        isError,
        error,
        data,
        isFetching,
        isPlaceholderData

    }

}

export default useMeals;
