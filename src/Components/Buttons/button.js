import React from 'react';
import { useNavigate } from 'react-router-dom';
import './buttons.css';

const Buttons = ({ selectedOption, showHomeButton }) => {
  const navigate = useNavigate();

  return (
    <div className="buttons-container">
      {selectedOption === 'Root' && (
        <>
          <button className="b1" onClick={() => navigate('/bisection')}>Bisection</button>
          <button className="b2" onClick={() => navigate('/false-position')}>False Position</button>
          <button className="b3" onClick={() => navigate('/one-point')}>One Point</button>
          <button className="b4" onClick={() => navigate('/newton-raphson')}>Newton-Raphson</button>
          <button className="b5" onClick={() => navigate('/secant-method')}>Secant Method</button>
        </>
      )}

      {selectedOption === 'Linear' && (
        <>
          <button className="b6" onClick={() => navigate('/cramers-rule')}>Cramer's Rule</button>
          <button className="b7" onClick={() => navigate('/gaussian-elimination')}>Gauss-Elimination</button>
          <button className="b8" onClick={() => navigate('/jacobi-method')}>Jacobi Method</button>
          <button className="b9" onClick={() => navigate('/gauss-seidel')}>Gauss-Seidel</button>
        </>
      )}

      {selectedOption === 'Interpolation' && (
        <>
          <button className="b10" onClick={() => navigate('/lagrange')}>Lagrange</button>
          <button className="b11" onClick={() => navigate('/spline')}>Spline</button>
          <button className="b12" onClick={() => navigate('/regression')}>Regression</button>
        </>
      )}

      {showHomeButton && (
        <button className="home-button" onClick={() => navigate('/')}>
          Home
        </button>
      )}
    </div>
  );
};

export default Buttons;


