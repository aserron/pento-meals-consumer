import React from "react";
import {Meals} from "../../hooks/useMeals/Recipe.interface";
import {Box, Center, Heading, Image, Spinner, Table, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import {WarningIcon} from "@chakra-ui/icons";
import {totalmem} from "node:os";


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
    return <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
    />;
}

export const MealsTable: React.FC<{ meals: Meals, isLoading: boolean }> = ({meals, isLoading}) => {

    const isEmptyMealArr = !meals || meals.length === 0;

    return (isLoading)

        ? <MealSpinner/>

        : <Table mt={4} variant="striped" colorScheme={'green'}>
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
                            <Tr h={100} key={meal.idMeal}>
                                
                                <Td minH={120} w={4}>{`#${meal.idMeal}`}</Td>
                                
                                <Td maxWidth={60} p={0}>
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

                                <Td>{meal.strMeal}</Td>
                                <Td>{meal.strArea}</Td>
                                <Td>{meal.strCategory}</Td>
                            </Tr>
                        ))
                }
            </Tbody>

            <Tfoot>
                <Tr background={"antiquewhite"} w={"fit-content"} gridColumnStart={0} gridColumnEnd={5}>
                    <Th colSpan={5}>
                        {!isLoading && (
                            < div className="pager-found">
                                Found: {meals.length} Recipes
                            </div>
                        )}</Th>
                </Tr>
            </Tfoot>
        </Table>;
};
