import React, {useCallback, JSX} from "react";
import {Meals} from "../../hooks/useMeals/Recipe.interface";
import {Box, Center, Heading, Image, Spinner, Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import {WarningIcon} from "@chakra-ui/icons";
import Pagination from "../Paginantion/Pagination";
import ReactDOM from "react-dom/client";
import {render} from "@testing-library/react";


function NoResults() {
    return <Tr>
        <Td colSpan={5} w={4}>
            <Center>
                <Heading><WarningIcon boxSize={4}/>No Result</Heading>
            </Center>

        </Td>
    </Tr>;
}

function MealSpinner() {
    return <>

        <Center>
            <Box textAlign="center">
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
                <Text pl={2} as="h2">Loading... Please wait.</Text>
            </Box>
        </Center>
    </>;
}

interface MealsTableFooterParams {
    pageSize: number;
    current: number;
    totalCount: number;
    loading: boolean;
    length: number;
    onSetPage:(page:number)=>void;
};


export const MealsTableFooter: React.FC<
    MealsTableFooterParams
> = ({pageSize, current, totalCount, length, loading,onSetPage}) => {

    const onPaginationPageChange = useCallback((pageNumber: number) => {
        console.log(`setCurrentPage(${pageNumber})`);
        onSetPage(pageNumber);
    }, [onSetPage]);

    const show = true;
    return <>
        {show && (
            < div className="pager-found">
                Found: {totalCount} Recipes
            </div>
        )}

        {show && (
            <Center>
            <Pagination
                onPageChange={onPaginationPageChange}
                totalCount={totalCount}
                currentPage={current}
                pageSize={pageSize}
                siblingCount={1}
                className="pagination-bar"

            />
            </Center>
        )}
    </>;
};

export const MealsTable: React.FC<{
    meals: Meals,
    totalCount:number,
    isLoading: boolean,
    pageSize: number,
    totalPages: number,
    current: number,
    loading: boolean,
    setPage: (page:number)=>void;

}> = ({meals, current,totalCount, totalPages, loading, pageSize, isLoading, setPage}) => {


    // const total: number = meals?.length ?? 0;
    const total=totalCount;
    const isEmptyMealArr = !total || total === 0;


    return (isLoading && false)

        ? <MealSpinner/>

        : <Table colorScheme={'green'} cellPadding={'30px'} rowGap={"30px"}>
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
                            <Tr  h={100} key={meal.idMeal}>

                                <Td pt={8} pb={8} minH={120} w={4}>{`#${meal.idMeal}`}</Td>

                                <Td pt={8} pb={8} maxWidth={60} p={0}>
                                    <Center>
                                        <Box bg="tomato" p={1} color="white">
                                            <Image
                                                align={"center"}
                                                boxSize={"80px"}
                                                alt={meal.idMeal}
                                                src={meal.strMealThumb}
                                                fallbackSrc='https://via.placeholder.com/150'
                                            ></Image></Box>
                                    </Center>
                                </Td>

                                <Td pt={8} pb={8}>{meal.strMeal}</Td>
                                <Td pt={8} pb={8}>{meal.strArea}</Td>
                                <Td pt={8} pb={8}>{meal.strCategory}</Td>
                            </Tr>
                        ))
                }
            </Tbody>

            <Tfoot>
                <Tr background={"antiquewhite"} w={"fit-content"} gridColumnStart={0} gridColumnEnd={5}>
                    <Th colSpan={5}>
                        <MealsTableFooter
                            onSetPage={setPage}
                            current={current}
                            pageSize={pageSize}
                            totalCount={total}
                            loading={isLoading}
                            length={meals.length}/>
                        
                    </Th>

                </Tr>
            </Tfoot>
        </Table>
        ;
};
