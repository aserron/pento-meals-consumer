import React from 'react';
import './App.css';
import RecipeList from "./components/meals/RecipeList";
import {Box} from "@chakra-ui/react";
import {MealsHeader} from "./MealsHeader";

const App: React.FC = () => (
    <Box p={4}>
        <MealsHeader/>        
        <RecipeList/>
    </Box>
);

export default App;
