import React from 'react';
import Home from './containers/Home';
import {Provider} from "react-redux";
import store from "./stores";

const App = () => {
    return (
        <>
            <Provider store={store}>
                <Home/>
            </Provider>
        </>
    )
};

export default App;
