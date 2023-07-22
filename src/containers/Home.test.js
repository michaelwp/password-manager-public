import React from 'react';
import {render} from '@testing-library/react';
import Home from './Home';
import {Provider} from "react-redux";
import store from "../stores";

test('Is Input and List Password Exist', () => {
    const {getByTestId} = render(
        <Provider store={store}>
            <Home/>
        </Provider>
    );

    const InputPassword = getByTestId('inputPassword');
    const ListPassword = getByTestId('listPassword');

    expect(InputPassword).toBeInTheDocument();
    expect(ListPassword).toBeInTheDocument();
});
