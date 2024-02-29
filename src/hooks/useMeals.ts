import {useState, useEffect, useCallback} from 'react';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const CATEGORIES_URL = '/categories.php';
const DEFAULT_PAGE_SIZE = 10;

interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
}
interface ApiResponse {
    meals?: Recipe[];
    total?: number;
}

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}
interface CategoriesResponse {
    categories: Category[];
}

const useMeals = (searchQuery: string = '', area: string = '', category: string = '', pageSize: number = DEFAULT_PAGE_SIZE) => {
    const [allMeals, setAllMeals] = useState<Recipe[]>([]);
    const [filteredMeals, setFilteredMeals] = useState<Recipe[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [total, setTotal] = useState<number | null>(null);

    const fetchMeals = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {
            let url = `${BASE_URL}/search.php?s=${searchQuery}`;

            // if (category) {
            //     url = `${BASE_URL}/filter.php?c=${category}`;
            // } else if (area) {
            //     url = `${BASE_URL}/filter.php?a=${area}`;
            // }

            const response = await fetch(url);
            const data: ApiResponse = await response.json();

            setAllMeals(data.meals || []);

            if (data.total !== undefined) {
                setTotalPages(Math.ceil(data.total / pageSize));
            } else {
                setTotal((data.meals || []).length);
                setTotalPages(Math.ceil((data.meals || []).length / pageSize));
            }

        } catch (error) {
            setError('Error fetching meals');
        } finally {
            setLoading(false);
        }
    }, [searchQuery, category, pageSize]);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch(`${BASE_URL}${CATEGORIES_URL}`);
            const data: CategoriesResponse = await response.json();
            setCategories(data.categories);
        } catch (error) {
            setError('Error fetching categories');
        }
    }, []);

    useEffect(() => {
            fetchCategories().then(() => fetchMeals());
        },
        [fetchMeals, fetchCategories]
    );

    useEffect(() => {
            // Filter meals based on category and area, if present.            
            const filtered = allMeals
                .filter((meal) => ((category === '') || meal.strCategory === category))
                .filter((meal) => ((area === '') || meal.strArea === area))


            // updating total and pages with filted version.                
            setTotalPages(Math.ceil(filtered.length / pageSize));
            setTotal((filtered || []).length);

            // console.info('filtered, setting filtered and total', filtered);

            // paging
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;

            // slicing the filtered to get the page.
            const result = filtered.slice(startIndex, endIndex);

            setFilteredMeals(result);
        },
        [searchQuery, allMeals, currentPage, pageSize]
    );


    const goToPage = (page: number) => {
        setCurrentPage(page);
    };
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
        const p = currentPage;
        fetchMeals().then(() => {
            goToPage(p)
        });
    }, [currentPage]);

    return {
        meals: filteredMeals, categories, loading, error,
        currentPage, totalPages, total, goToPage, nextPage, prevPage,
        reloadMeals
    };
};

export default useMeals;
