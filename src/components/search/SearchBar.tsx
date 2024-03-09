import React, {memo, useCallback} from 'react';
import {Flex, FormControl, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import consoleStyles from "../../utils/ConsoleStyles";
import {SearchIcon} from "@chakra-ui/icons";
import {FilterBar} from "./FilterBar";

// import './SearchBar.css'; // Import CSS file for styling

export interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: string;
    selectedArea: string;
    onCategoryChange: (category: string) => void;
    onAreaChange: (area: string) => void;
}


function NameSearchInput(
    {
        defaultValue,
        onChange
    }: { defaultValue: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
) {

    return (
        <InputGroup>
            <InputRightElement pointerEvents='none'>
                <SearchIcon color='gray.300'/>
            </InputRightElement>
            <Input name="search-name"
                   type='search'
                   defaultValue={defaultValue}
                   onChange={onChange}
                   aria-name={'Recipe Name'}
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
 * @type {React.FC<SearchBarProps>}
 */
function SearchBar({
                       searchQuery,
                       onSearchChange,
                       selectedCategory,
                       onCategoryChange,
                       selectedArea,
                       onAreaChange,
                   }: SearchBarProps) {

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
        <Flex justify="center" m={4}>
            <FormControl>
                {/*<FormLabel htmlFor="search">Search Recipes:</FormLabel>*/}
                <NameSearchInput defaultValue={searchQuery} onChange={handleChange}/>
            </FormControl>
        </Flex>
        <Flex align="center" justify="center">
            <FilterBar initialValue={selectedCategory}
                       value={selectedArea}
                       onCatChange={hdlCatChange}
                       onAreaChange={hdlAreaChange}/>
        </Flex>
    </>)
}


type P = keyof SearchBarProps;
type X = P[];

export default memo(
    SearchBar,

    /**
     * Compare Fn allows us to debug right in the moment of the nextProps evaluation.
     * @param prevProps
     * @param nextProps
     */
    (prevProps: SearchBarProps, nextProps: SearchBarProps) => {

        console.info('SearchBar: memo', prevProps);

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

        // keys.forEach((k:P , i:number) => {
        //    
        //     let a: any, b: any;
        //    
        //     if (Object.hasOwn(prevProps, k)) {
        //         a = prevProps[k]
        //     }
        //    
        //     if (Object.hasOwn(nextProps, k)) {
        //         b = nextProps[k]
        //     }
        //    
        //     const eq = Object.is(a, b);
        //     result.push({i, k,eq, a, b});        
        //
        // })

        // console.table(result);
        // console.table(prevProps);
        // console.table(nextProps);

        console.info(`%c[SearchBar] memo: areEq=${areEq}`, consoleStyles.use)
        return areEq;
    });
