import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './App';
import reportWebVitals from './reportWebVitals';

import theme from './theme';

import {ChakraProvider} from "@chakra-ui/react";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {useInitial, ComponentPreviews} from "./dev";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    // <React.StrictMode>


    <React.Suspense fallback={'loading'}>
        <DevSupport
              ComponentPreviews={ComponentPreviews}
              useInitialHook={useInitial}
            >
            <ChakraProvider resetCSS={true} theme={theme}>
                <App/>
            </ChakraProvider>
        </DevSupport>
    </React.Suspense>


    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
