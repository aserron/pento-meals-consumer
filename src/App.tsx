import React from 'react';
import './App.css';
import RecipeList from "./components/RecipeList";

function App() {
    return (
        <div className="App" style={{display: 'hidden'}}>
            <header className="App-header">
                <h1>Meals API Consumter</h1>
            </header>
            <section className={`App-search`}>
                <RecipeList/>
            </section>
        </div>
    );
}

export default App;
