import React, {memo, PropsWithChildren, useCallback} from 'react';
import {Box, Flex, FormControl, HStack, Input, InputGroup, InputRightElement, VStack} from "@chakra-ui/react";
import consoleStyles from "../../utils/ConsoleStyles";
import {SearchIcon} from "@chakra-ui/icons";
import {FilterBar} from "./FilterBar";

// import './SearchBar.css'; // Import CSS file for styling

export interface ISearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: string;
    selectedArea: string;
    onCategoryChange: (category: string) => void;
    onAreaChange: (area: string) => void;
}

type SearchBarProps = React.PropsWithChildren<ISearchBarProps>;


function NameSearchInput(
    {
        defaultValue,
        onChange
    }: { defaultValue: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
) {

    return (        
        <InputGroup width={`100%`}>
            <InputRightElement pointerEvents='none'>
                <SearchIcon color='gray.300'/>
            </InputRightElement>
            <Input name="search-name"
                   type='search'
                   defaultValue={defaultValue}
                   onChange={onChange}
                   aria-label={'name'}
                   placeholder='recipe name'/>
        </InputGroup>
    )
}

/**
 *
 * @param searchQuery
 * @param onSearchChange
 * @param selectedCategory
 * @param onCategoryChange
 * @param selectedArea
 * @param onAreaChange
 * @constructor
 * @type {SearchBarProps}
 */
function SearchBar({
                       children,
                       searchQuery,
                       onSearchChange,
                       selectedCategory,
                       onCategoryChange,
                       selectedArea,
                       onAreaChange,
                   }: PropsWithChildren<SearchBarProps>) {

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`[SearchBar] handleChange: e=`, e.target);
        onSearchChange(e.target.value);
    }, []);

    const hdlCatChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        onCategoryChange(e.target.value);
    }, []);

    const hdlAreaChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        onAreaChange(e.target.value);
    }, []);


    return (<>
        <Box w="100%" p={4}
             // bg="tomato" color="white"
        >
            {/*This is the Box*/}
            <VStack spacing="24px">
                <Flex  w={`100%`} justify="center" m={4}>
                    <FormControl w={`100%`}>
                        {/*<FormLabel htmlFor="search">Search Recipes:</FormLabel>*/}
                        <NameSearchInput defaultValue={searchQuery} onChange={handleChange}/>
                    </FormControl>
                </Flex>
                <Flex  w={`100%`} align="center" justify="center">
                    <FilterBar initialValue={selectedCategory}
                               value={selectedArea}
                               onCatChange={hdlCatChange}
                               onAreaChange={hdlAreaChange}/>
                </Flex>
                {children}
            </VStack>
        </Box>
    </>)
}


type P = keyof SearchBarProps;
type X = P[];

export default memo(
    SearchBar,

    /**
     * Compare Fn allows us to debug right in the moment of the nextProps evaluation.
     * @example
     keys.forEach((k:P , i:number) => {

     let a: any, b: any;

     if (Object.hasOwn(prevProps, k)) {
     a = prevProps[k]
     }

     if (Object.hasOwn(nextProps, k)) {
     b = nextProps[k]
     }

     const eq = Object.is(a, b);
     result.push({i, k,eq, a, b});

     })
     * @param prevProps
     * @param nextProps
     */
    (prevProps: SearchBarProps, nextProps: SearchBarProps) => {

        // console.info('SearchBar: memo', prevProps);

        const keys = Object.getOwnPropertyNames(nextProps) as X;

        const result: any[] = [];

        const areEq = keys.every((k: P, i: number) => {

            let a: any, b: any;

            if (Object.hasOwn(prevProps, k)) {
                a = prevProps[k]
            }

            if (Object.hasOwn(nextProps, k)) {
                b = nextProps[k]
            }

            return Object.is(a, b);
        })

        // debug


        // console.table(result);
        // console.table(prevProps);
        // console.table(nextProps);

        console.info(`%c[SearchBar] memo: areEq=${areEq}`, consoleStyles.use)
        return areEq;
    });
