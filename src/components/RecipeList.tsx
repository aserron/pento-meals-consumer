// src/components/RecipeList.tsx
import React, {useEffect, useState} from 'react';

import useMeals from '../hooks/useMeals';
import SearchBar from "./SearchBar";
import PagerBar from "./PagerBar";
import {Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon} from '@chakra-ui/react';


const RecipeList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedArea, setSelectedArea] = useState<string>('');

    const pageSize = 5; // Change the page size as needed

    const {
        meals,
        categories,
        loading,
        error,
        total,
        totalPages,
        currentPage,
        goToPage,
        nextPage,
        prevPage,
        reloadMeals

    } = useMeals(
        searchQuery,
        selectedArea,
        selectedCategory,        
        pageSize
    );


    useEffect(() => {
            goToPage(1); // Reset current page when search query or category changes        
        },
        [searchQuery, selectedCategory,selectedArea]);


    useEffect(() => {
        console.info('Setting Interval')
        const intervalId = setInterval(() => {
            console.info('Reloading Meal');
            reloadMeals();
        }, 10000); // Reload every 10 seconds
        return () => {
            clearInterval(intervalId);
        };
    }, [reloadMeals]);


    const handleSearchChange = (s: string) => {
        setSearchQuery(s);
    };

    const handleCategoryChange = (category: string) => {
        console.info('handleCategoryChange  cat=%s', category)
        setSelectedCategory(category);
    };
    
    const handleAreaChange = (s: string) => {
            console.info('handle Area Change  area=%s', s)
            setSelectedArea(s);
        };


    const opt = {currentPage, nextPage, prevPage, total, totalPages};

    return (
        <Box>
            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                
                selectedCategory={selectedCategory}                
                categories={categories}
                onCategoryChange={handleCategoryChange}
                
                selectedArea={selectedArea}
                onAreaChange={handleAreaChange}
            />
            {error && (
                <Alert status="error" mt={4}>
                    <AlertIcon/>
                    {error}
                </Alert>
            )}
            {loading ? (
                <Spinner size="lg" mt={4}/>
            ) : (<>

                <PagerBar totalPages={totalPages} total={total}
                          prevPage={prevPage}
                          nextPage={nextPage}
                          currentPage={currentPage}

                />
                <Table mt={4} variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Area</Th>
                            <Th>Category</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {meals.map((meal) => (
                            <Tr key={meal.idMeal}>
                                <Td>{meal.idMeal}</Td>
                                <Td>{meal.strMeal}</Td>
                                <Td>{meal.strArea}</Td>
                                <Td>{meal.strCategory}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </>)
            }
        </Box>
    )
        ;
};

export default RecipeList;
