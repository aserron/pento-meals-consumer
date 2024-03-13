import React from 'react';
import './App.css';
import RecipeList from "./components/meals/RecipeList";
import {Box, Center, Flex, VStack} from "@chakra-ui/react";
import {MealsHeader} from "./MealsHeader";

const App: React.FC = () => (
    <Box width={"100%"}>
        <VStack  p={4} >
            <Box w="100%" p={4}>                
                <MealsHeader/>
            </Box>            
            <Center w={'100%'}>
                <Box w={"80%"}>
                    <RecipeList/>
                </Box>
            </Center>
        </VStack>
    </Box>
);

export default App;
