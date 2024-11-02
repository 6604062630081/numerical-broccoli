import React from 'react';
import { useNavigate } from 'react-router-dom';
import './buttons.css';

const buttonMapping = {
  Root: [
    { label: 'Bisection', path: '/bisection' },
    { label: 'False Position', path: '/false-position' },
    { label: 'One Point', path: '/one-point' },
    { label: 'Newton-Raphson', path: '/newton-raphson' },
    { label: 'Secant Method', path: '/secant-method' },
  ],
  Linear: [
    { label: "Cramer's Rule", path: '/cramers-rule' },
    { label: 'Gauss-Elimination', path: '/gaussian-elimination' },
    { label: 'Jacobi Method', path: '/jacobi-method' },
    { label: 'Gauss-Seidel', path: '/gauss-seidel' },
  ],
  Interpolation: [
    { label: 'Lagrange', path: '/lagrange' },
    { label: 'Spline', path: '/spline' },
    { label: 'Regression', path: '/regression' },
  ],
};

const Buttons = ({ selectedOption }) => {
  const navigate = useNavigate();

  return (
    <div className="buttons-container">
      {selectedOption && buttonMapping[selectedOption]?.map((button, index) => (
        <button key={index} className={`b${index + 1}`} onClick={() => navigate(button.path)}>
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
