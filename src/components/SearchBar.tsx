import React from 'react';
import {Category} from '../hooks/useMeals';
import {Flex, FormControl, FormLabel, Heading, HStack, Input, Select} from "@chakra-ui/react";

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
    return (
        <>
            <Flex justify="center" m={4}>
                
                <FormControl>
                    {/*<FormLabel htmlFor="search">Search Recipes:</FormLabel>*/}
                    <Input
                        id="search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search recipes"
                    />
                </FormControl>
            </Flex>


            <Flex align="center" justify="center">

                <FormControl>

                    <HStack>

                        <FormLabel htmlFor="category">Filters:</FormLabel>

                        <Select
                            id="category"
                            maxWidth={300}
                            value={selectedCategory}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            placeholder="Category"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.idCategory} value={category.strCategory}>
                                    {category.strCategory}
                                </option>
                            ))}
                        </Select>
                    </HStack>
                </FormControl>
            </Flex>
        </>
    );
};

export default SearchBar;
