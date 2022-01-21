import ReactDOM from 'react-dom';
import React from 'react';
import './Global.css';

const info = (<h1 className="background">Initialized React App</h1>);

ReactDOM.render(
    info,
    document.getElementById('app')
);