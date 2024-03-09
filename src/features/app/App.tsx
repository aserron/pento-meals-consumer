import React from 'react';
import logo from './logo.svg';
import './App.css';
import CheckMeals from "../meals/CheckMeals";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>

            <div className="App">
                <section>
                    <CheckMeals/>
                </section>
            </div>
        </QueryClientProvider>

    );
}

export default App;
