import React, {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {CATEGORIES_URL, CategoriesResponse, Category} from "../../hooks/useMeals/useMeals";
import {Select} from "@chakra-ui/react";
import cs from "../../utils/ConsoleStyles";


interface CatSelectProps {
    initialValue: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

export const CategorySelect: React.FC<PropsWithChildren<CatSelectProps>
> = (props) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    console.info(`%c[CategorySelect]: onRender`, cs.info, props);

    const fetchCategories = useCallback(async () => {
        const response = await fetch(`${CATEGORIES_URL}`);
        const data: CategoriesResponse = await response.json();
        return data;
    }, []);

    const [count, setCount] = useState(0);

    const setLoading = useCallback(
        () => {
            setCount(prev => prev + 1);
            setIsLoading(true);
        }, []
    )

    useEffect(() => {
        console.info(`%c[CategorySelect]: useEffect (${count})`, cs.info, props);
        if (count > 1) console.error(`[CategorySelect]: useEffect (${count})`)

        setIsLoading(true);
        setError(null);
        fetchCategories()
            .then(data => {
                setCategories(data.categories);
            })
            .catch(error => {
                setError('Error fetching categories');
            })
            .finally(
                () => {
                    setIsLoading(false);
                }
            )
    }, [])

    return <Select
        aria-label={`Categories`}
        disabled={isLoading}
        name="categories"
        maxWidth={300}
        onChange={props.onChange}
        placeholder="Categories"

    >
        <option key={`id-0`} value={''}>All Categories</option>

        {!isLoading && categories.map((category) => (
            <option key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
            </option>
        ))}
    </Select>;
}
