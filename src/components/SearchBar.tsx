import React from 'react';
import {Category} from '../hooks/useMeals';
import {FormControl, Input} from "@chakra-ui/react";

// import './SearchBar.css'; // Import CSS file for styling

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: string;
    categories: Category[];
    onCategoryChange: (category: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
                                                 searchQuery,
                                                 onSearchChange,
                                                 selectedCategory,
                                                 categories,
                                                 onCategoryChange,
                                             }) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onCategoryChange(e.target.value);
    };

    return (
        <section className="search-bar-section"> {/* Section container with a title */}
            {/*<h2>Recipe Search</h2>*/}
            <FormControl p={3}>                
                <Input id="searchInput" type="text" value={searchQuery} onChange={handleSearchChange}
                       placeholder="Search By Name"/>
            </FormControl>

            <div className="search-bar-container"> {/* Apply container-wide styling */}
                <label htmlFor="categorySelect">category:</label>
                <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.idCategory} value={category.strCategory}>
                            {category.strCategory}
                        </option>
                    ))}
                </select>


            </div>
        </section>
    );
};

export default SearchBar;
