import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * Represents a HTML element container.
 *
 * @class
 */
const container = document.getElementById('root');
/**
 * Creates a root element and attaches it to the specified container.
 *
 * @param {HTMLElement} container - The container element to attach the root element to.
 * @returns {HTMLElement} The root element that has been created and attached to the container.
 */
const root = createRoot(container);
root.render(<App/>);


// If you want to start measuring performance in your app, pass a function
// to log results (for example, reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
