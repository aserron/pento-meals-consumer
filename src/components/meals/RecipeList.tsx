// src/components/RecipeList.tsx
import React, {useCallback, useEffect, useState} from 'react';

import useMeals from '../../hooks/useMeals/useMeals';
import SearchBar from "../search/SearchBar";
import PagerBar from "../PagerBar";

import {Alert, AlertIcon, Box, Button, Center, VStack} from '@chakra-ui/react';

import cs from "../../utils/ConsoleStyles";

import {MealsTable, MealsTableFooter} from "./MealsTable";
import {useToast} from '@chakra-ui/react'


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

    const toast = useToast();

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


    // further we can add a switch to control reloading.
    useEffect(() => {
        if (!!error) {
            console.info('Toast', error);

            toast({
                title: `${error}`,
                status: "error",
                isClosable: true,
            })
        }
    }, [error]);

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
        <Box w={`100%`}>
            <VStack>
                <Center  w={`100%`}>
                    <SearchBar
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}

                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}

                        selectedArea={selectedArea}
                        onAreaChange={handleAreaChange}
                    />
                    <SearchError error={error}/>
                </Center>
                <Center>
                    <PagerBar
                        isLoading={loading}
                        total={total}
                        totalPages={totalPages}
                        prevPage={prevPage}
                        nextPage={nextPage}
                        currentPage={currentPage}
                        goToPage={goToPage}
                    />
                </Center>

                <MealsTable
                    meals={meals}
                    totalCount={total ?? 0}
                    isLoading={loading}
                    pageSize={pageSize}
                    totalPages={totalPages ?? 0}
                    current={currentPage}
                    loading={loading}
                    setPage={goToPage}
                />


            </VStack>
        </Box>
    );
};

export default RecipeList;
