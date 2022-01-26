import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { TopBar } from './components/TopBar'
import './Global.css';

ReactDOM.render(
    <TopBar />,
    document.getElementById('app')
);