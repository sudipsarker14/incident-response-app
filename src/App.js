import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IncidentForm from './IncidentForm';
import ProductsDemo from './Deshboard';
import Table from './Table';

import './index.css';
//import './App.css';
import './flags.css';
import UpdateForm from './updateform';


/*
function App() {
  return (
    <div className="App">
      <h1>Incident Response Register</h1>
      <IncidentForm />
    </div>
  );
}
*/
function App() {
  return (
    <div className='App'>
    <BrowserRouter>
        <Routes>
          <Route path="/incident" element={<IncidentForm />} />
          <Route path="/deshboard" element={<ProductsDemo />} /> 
          <Route path="/table" element={<Table />} /> 
          <Route path="/incident/:id" element={<UpdateForm />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;