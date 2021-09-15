import React from 'react';
import { Card } from './components/card';
import './App.css';

export default function App() {
    return (
        <div className="App">
            <Card delay={50}/>
        </div>
    );
};
