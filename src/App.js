import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Cell from './component/Cell';
import DictWord from './words.txt';
import Line from './component/Line';

function App() {

  return (
    <div className="App">
      <Line guess='LEHHH' word='HELLO'/>

    </div>
  );
}

export default App;
