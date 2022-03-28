import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import React from 'react';
import './Global.css';
import { CookiesProvider } from "react-cookie";
import App from "./App";


ReactDOM.render(
    <CookiesProvider>   
         <App /> 
     </CookiesProvider>,
    document.getElementById('app')
);