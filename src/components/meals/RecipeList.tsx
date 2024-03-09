// src/components/RecipeList.tsx
import React, {useCallback, useEffect, useState} from 'react';

import useMeals from '../../hooks/useMeals/useMeals';
import SearchBar from "../search/SearchBar";
import PagerBar from "../PagerBar";
import {WarningIcon } from '@chakra-ui/icons'

import {
    TypographyProps,    
    Icon,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    Alert,
    AlertIcon,
    Image,
    AbsoluteCenter,
    Center, Heading, chakra
} from '@chakra-ui/react';

import cs from "../../utils/ConsoleStyles";
import {Meals} from "../../hooks/useMeals/Recipe.interface";


function SearchError({error}: { error: string | null }) {
    return (
        (!error)
            ? null
            : <Alert status="error" mt={4}>
                <AlertIcon/>
                {error}
            </Alert>
    );
}


function NoResults() {
    return <Tr>
        <Td colSpan={5} w={4}>
            <Center>
                <Heading><WarningIcon boxSize={4}/>No Result</Heading>
            </Center>

        </Td>        
    </Tr>;
}

const MealList: React.FC<{ meals: Meals, isLoading: boolean }> = ({meals, isLoading}) => {

    const isEmptyMealArr = !meals || meals.length === 0;

    return (isLoading)

        ? <Spinner size="lg" mt={4}/>

        : <Table mt={4} variant="striped" colorScheme="teal">
            <Thead>
                <Tr>
                    <Th width={4}>ID</Th>
                    <Th width={100}>-</Th>
                    <Th>Name</Th>
                    <Th>Area</Th>
                    <Th>Category</Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                    (isEmptyMealArr)
                        ? <NoResults/>
                        : meals.map((meal) => (
                            <Tr key={meal.idMeal}>
                                <Td w={4}>{`#${meal.idMeal}`}</Td>
                                <Td w={10} pr={0}><Image src={meal.strMealThumb}></Image></Td>
                                <Td>{meal.strMeal}</Td>
                                <Td>{meal.strArea}</Td>
                                <Td>{meal.strCategory}</Td>
                            </Tr>
                        ))
                }
            </Tbody>
        </Table>;
};

const RecipeList: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedArea, setSelectedArea] = useState<string>('');
    const [reload, setReload] = useState(true);

    const pageSize = 5; // Change the page size as needed

    const {
        searchQuery,
        setSearchQuery,
        meals,
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
        selectedArea,
        selectedCategory,
        pageSize
    );

    // Reset current page when search query or category changes
    useEffect(() => {
        goToPage(1);
    }, [searchQuery, selectedCategory, selectedArea]);


    // further we can add a switch to control reloading.
    useEffect(() => {
        console.info('Setting Interval reload:%s', reload);

        const intervalId = setInterval(() => {
            if (reload) {
                reloadMeals();
            }
        }, 10000); // Reload every 10 seconds
        return () => {
            clearInterval(intervalId);
        };
    }, [reloadMeals, reload]);


    // handlers.

    const handleSearchChange = useCallback((s: string) => {
        console.warn("%c[RecipeList]", cs.info, `handleSearch: search=${s} `);
        setSearchQuery(s);
    }, [setSearchQuery]);

    const handleCategoryChange = useCallback((c: string) => {
        console.log("%c[RecipeList]", cs.info, "cat=%s", c);
        setSelectedCategory(c);
    }, []);

    const handleAreaChange = useCallback((s: string) => {
        console.info("%c[RecipeList]", cs.info, " handleAreaChange area=%o", s);
        setSelectedArea(s);
    }, [setSelectedArea]);

    return (
        <Box>
            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}

                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}

                selectedArea={selectedArea}
                onAreaChange={handleAreaChange}
            />
            <SearchError error={error}/>

            <PagerBar
                isLoading={loading}
                total={total}
                totalPages={totalPages}
                prevPage={prevPage}
                nextPage={nextPage}
                currentPage={currentPage}
            />

            <MealList meals={meals} isLoading={loading}/>


        </Box>
    );
};

export default RecipeList;
