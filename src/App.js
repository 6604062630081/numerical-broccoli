import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SelectDropdown from './Components/Dropdown/dropdown';
import Buttons from './Components/Buttons/button';
import { 
  Bisection, FalsePosition, 
  OnePoint, NewtonRaphson, 
  SecantMethod, CramersRule, 
  GaussianElimination, 
  JacobiMethod, Home,
  GaussSeidel, Lagrange, 
  SplineCalculator, 
  LinearRegression 
} from './Components/componentRender';

function App () {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    navigate(value); // Navigate to the selected route
  };

  return (
    <div className="App">
      <div className="Button-Container">
        <h1>Please Select ✌🏽</h1>
        <SelectDropdown onSelect={handleSelectChange} />
      </div>
      <Buttons selectedOption={selectedOption} />

      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/bisection" element={<Bisection />} />
        <Route path="/false-position" element={<FalsePosition />} />
        <Route path="/one-point" element={<OnePoint />} />
        <Route path="/newton-raphson" element={<NewtonRaphson />} />
        <Route path="/secant-method" element={<SecantMethod />} />
        <Route path="/cramers-rule" element={<CramersRule />} />
        <Route path="/gaussian-elimination" element={<GaussianElimination />} />
        <Route path="/jacobi-method" element={<JacobiMethod />} />
        <Route path="/gauss-seidel" element={<GaussSeidel />} />
        <Route path="/lagrange" element={<Lagrange />} />
        <Route path="/spline" element={<SplineCalculator />} />
        <Route path="/regression" element={<LinearRegression />} />
      </Routes>
    </div>
  );
};

// // Wrap App in Router to provide routing context
// const AppWrapper = () => (
//   <Router>
//     <App />
//   </Router>
// );

export default App;