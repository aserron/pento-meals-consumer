import React from 'react';
import './App.css';
import RecipeList from "./components/RecipeList";
import {Box, Center, ChakraProvider} from "@chakra-ui/react";

function App() {
    return (
        <ChakraProvider>

            <div className="App" style={{display: 'hidden'}}>
                <Box>
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
