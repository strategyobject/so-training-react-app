import './App.css';
import Login from "./component/Login/Login";
import HsCode from './component/HsCode/HsCode';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Login/>}></Route>
        <Route path='/hscodes' element = {<HsCode/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
