import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    createHashRouter,
    RouterProvider
} from 'react-router-dom';
import store from './redux/reduxStore';
import { Provider } from 'react-redux';

const router = createHashRouter([
    {
        path: "/*",
        element:
            <Provider store={store}>
                <App />
            </Provider>,
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <RouterProvider router={router} />
);