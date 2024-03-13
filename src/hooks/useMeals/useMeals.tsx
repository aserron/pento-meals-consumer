import {useCallback, useEffect, useState} from 'react';
import {RecipeInterface} from "./Recipe.interface";
import {ApiResponseInterface} from "./apiResponse.interface";
import consoleStyles from "../../utils/ConsoleStyles";

export const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
export const CATEGORIES_URL = BASE_URL + '/categories.php';
export const DEFAULT_PAGE_SIZE = 5;

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface CategoriesResponse {
    categories: Category[];
}

const useMeals = (area: string = '', category: string = '', pageSize: number = DEFAULT_PAGE_SIZE) => {

    const [searchQuery, setSearchQuery] = useState('');

    const [allMeals, setAllMeals] = useState<RecipeInterface[]>([]);
    const [filteredMeals, setFilteredMeals] = useState<RecipeInterface[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);

    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [total, setTotal] = useState<number | null>(null);

    console.info("%c[useMeals] onRender", consoleStyles.use, `searchQuery=${searchQuery}`)


    const fetchMeals = useCallback(async () => {

        console.info("%c[useMeals] fetchMeals", consoleStyles.use, `s=${searchQuery}`)

        let url = `${BASE_URL}/search.php?s=${searchQuery}&p=0`;

        const response = await fetch(url);
        const data: ApiResponseInterface = await response.json();
        return data;
    }, [searchQuery])


    useEffect(
        () => {
            setLoading(true);
            setError(null);

            fetchMeals()
                .then((data) => {

                    // if reload, we keep current page;
                    if (reload) {
                        setReload(false);
                        setCurrentPage(currentPage);
                    } else {
                        setCurrentPage(1);
                    }


                    // main data set.
                    setAllMeals(data.meals || []);

                    // update total count, pages.
                    if (data.total !== undefined) {
                        setTotal(data.total);
                        setTotalPages(Math.ceil(data.total / pageSize));
                    } else {
                        setTotal((data.meals || []).length);
                        setTotalPages(Math.ceil((data.meals || []).length / pageSize));
                    }
                })
                .catch(error => setError(`Error fetching meals: ${error}`))
                .finally(() => {
                    setLoading(false);
                })

            return () => {
                console.warn(`%c[useMeals] useEffect: unmount`, consoleStyles.use);
            }

        },
        [searchQuery, category, pageSize]
    );


    useEffect(
        () => {
            // Filter meals based on category and area, if present.            
            const filtered = allMeals
                .filter((meal) => ((category === '') || meal.strCategory === category))
                .filter((meal) => ((area === '') || meal.strArea === area))

            // updating total and pages with filted version.                
            setTotalPages(Math.ceil(filtered.length / pageSize));
            setTotal((filtered || []).length);

            console.info("%c[useMeals] onRender", consoleStyles.use, 'setting filtered and total:', filtered.length);

            // paging
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;

            // slicing the filtered to get the page.
            const result = filtered.slice(startIndex, endIndex);

            setFilteredMeals(result);
        }
        , [loading, searchQuery, allMeals, currentPage, pageSize]
    )


    const goToPage = useCallback((page: number) => {
        // console.warn(`useCallback((${page}) => ...)`);
        setCurrentPage(page);
    }, [])

    const nextPage = () => {
        if (currentPage < (totalPages || 1)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const reloadMeals = useCallback(() => {
        setReload(true);
        // const p = currentPage;
        // fetchMeals().then(() => {
        //     goToPage(p)
        // });
    }, [searchQuery, currentPage]);


    return {
        searchQuery, setSearchQuery,
        meals: filteredMeals,
        loading,
        error,
        total,
        currentPage, totalPages, goToPage, nextPage, prevPage,
        reloadMeals
    };
};

export default useMeals;
