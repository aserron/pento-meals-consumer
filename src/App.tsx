import React from 'react';
import './App.css';
import RecipeList from "./components/meals/RecipeList";
import {Box, Center, ChakraProvider, CSSReset} from "@chakra-ui/react";

function App() {
    return (
        <ChakraProvider>
            <CSSReset />
            <div className="App" style={{display: 'hidden'}}>
                <Box p={4}>
                    <header className="App-header">
                        <Center>
                            <h1>Meals API Consumter</h1>
                        </Center>
                    </header>
                    <section className={`App-search`}>
                        <RecipeList/>
                    </section>
                </Box>
            </div>

        </ChakraProvider>

    );
}

export default App;
