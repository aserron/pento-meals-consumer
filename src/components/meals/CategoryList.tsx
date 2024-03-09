import React, {ReactEventHandler, useCallback, useEffect, useState} from 'react';
import {BASE_URL, CATEGORIES_URL, CategoriesResponse, Category} from '../../hooks/useMeals/useMeals';

interface Props {
    categories: Category[];
    onSelectCategory: (id: string, category: string) => void;
}

interface CategoryItemProps {
    handleSelectCategory: (e: React.MouseEvent<HTMLLIElement>) => void,
    categoryId: Category["idCategory"],
    category: Category["strCategory"],
};


const CategoryItem: React.FC<CategoryItemProps> = ({categoryId, category, handleSelectCategory}) => {

    return <li
        data-id={categoryId}
        data-name={category}
        onClick={handleSelectCategory}
    >
        {category}
    </li>;
};

const CategoryList: React.FC<Props> = ({onSelectCategory}) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(false);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}${CATEGORIES_URL}`);
            const data: CategoriesResponse = await response.json();
            setCategories(data.categories);
        } catch (error) {
            setError('Error fetching categories');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(
        () => {
            fetchCategories()
        }
    );


    const handleSelectCategory = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (!!e.currentTarget) {
                const {id, name} = e.currentTarget.dataset;
                onSelectCategory(id as string, name as string);
            }
        },
        []
    );

    return (
        <section className={`list-cat`}>
            <h2>Categories</h2>
            <ul>
                {categories.map((category: Category) => (
                    <CategoryItem
                        key={category.idCategory}
                        categoryId={category.idCategory}
                        category={category.strCategory}
                        handleSelectCategory={handleSelectCategory}
                    />
                ))}
            </ul>
        </section>
    );
};

export default CategoryList;
