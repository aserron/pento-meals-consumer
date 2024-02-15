// src/components/RecipeList.tsx
import React, {useEffect, useState} from 'react';
import useMeals from '../hooks/useMeals';
import SearchBar from "./SearchBar";
import PagerBar from "./PagerBar";

const RecipeList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    // const [currentPage, setCurrentPage] = useState<number>(1);

    const pageSize = 10; // Change the page size as needed

    const {meals, categories, loading, error, totalPages, total, currentPage, goToPage, nextPage, prevPage} = useMeals(
        searchQuery,
        selectedCategory,
        pageSize
    );


    useEffect(() => {
        goToPage(1)
        // setCurrentPage(1); // Reset current page when search query or category changes
    }, [searchQuery, selectedCategory]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    
    const onSearchChange = (s: string) => {
        setSearchQuery(s);
    };

    const handleCategoryChange = (category: string) => {
        console.info('category:', category)
        setSelectedCategory(category);
    };


    return (
        <section className={`recipes`}>
            <SearchBar searchQuery={searchQuery}
                       onSearchChange={onSearchChange}
                       selectedCategory={selectedCategory}
                       categories={categories}
                       onCategoryChange={handleCategoryChange}
            ></SearchBar>
            
            
            {error && <article><h3>Error!</h3><p>{error}</p></article>}
            <div>
                <h2>Recipes</h2>
                <PagerBar
                        total={total}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        prevPage={prevPage}
                        nextPage={nextPage}
                      />

                {loading
                    ? <h2>loading</h2>
                    : <div className={`list-ct`}>
                        <ul className={`recipes-list`}>
                            {meals.map((meal) => (
                                <li key={meal.idMeal}>
                                    {/*id, name, area, category.*/}
                                    <h3>{meal.idMeal} - {meal.strMeal} - {meal.strArea} - {meal.strCategory}</h3>
                                    <div className={`recipes-detail`}>
                                        <img src={meal.strMealThumb} alt={meal.strMeal}/>
                                        <p>{meal.strInstructions}</p>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>


            <h2>end</h2>
        </section>
    );
};

export default RecipeList;
