import React, {useEffect, useState} from 'react';
import {Category} from '../hooks/useMeals';
import {Flex, FormControl, FormLabel, Heading, HStack, Input, Select} from "@chakra-ui/react";

// import './SearchBar.css'; // Import CSS file for styling

function AreaSelect(props: { value: string, onChange: (e: any) => void }) {

    const [areas, setAreas] = useState([]);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
            .then(res => res.json())
            .then(data => {
                const arr = data.meals.map((it: any) => it.strArea);
                setAreas((prev) => arr);
            })
    }, [])


    return <Select
        id="area"
        maxWidth={300}
        value={props.value}
        onChange={props.onChange}
        placeholder="Areas"
    >
        <option value="">All Areas</option>
        {
            areas.map((areaName) => (
                <option key={areaName} value={areaName}>
                    {areaName}
                </option>
            ))
        }
    </Select>;
}


interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    categories: Category[];
    selectedCategory: string;
    selectedArea: string;
    onCategoryChange: (category: string) => void;
    onAreaChange: (area: string) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({
                                                 searchQuery,
                                                 onSearchChange,
                                                 categories,
                                                 selectedCategory,
                                                 onCategoryChange,
                                                 selectedArea,
                                                 onAreaChange,
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
                            id="area"
                            maxWidth={300}
                            value={selectedCategory}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            placeholder="Categories"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.idCategory} value={category.strCategory}>
                                    {category.strCategory}
                                </option>
                            ))}
                        </Select>

                        <AreaSelect
                            value={selectedArea}
                            onChange={(e) => onAreaChange(e.target.value)}/>


                    </HStack>
                </FormControl>
            </Flex>
        </>
    );
};

export default SearchBar;
