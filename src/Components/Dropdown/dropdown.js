import React, { useState } from 'react';
import './dropdown.css';

const SelectDropdown = ({ onSelect }) => {
  const [selects, setSelects] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelects(value);
    onSelect(value); // Call the onSelect function passed as a prop
  };

  return (
    <select value={selects} onChange={handleChange}>
      <option value="">Select an option</option>
      <option value="Root">Root</option>
      <option value="Linear">Linear</option>
      <option value="Interpolation">Interpolation</option>
    </select>
  );
};

export default SelectDropdown;

