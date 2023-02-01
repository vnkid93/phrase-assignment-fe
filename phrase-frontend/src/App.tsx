import React from 'react';
import './App.css';
import { SetupPage } from './component/SetupPage';
import { ProjectPage } from './component/ProjectPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SetupPage />} />
          <Route path='/projects' element={<ProjectPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
