import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const linearSpline = (xi, yi, n, x, slopes) => {
  for (let i = 0; i < n - 1; i++) {
    if (xi[i] <= x && x <= xi[i + 1]) {
      const m = slopes[i];
      const y = m * (x - xi[i]) + yi[i];
      return y;
    }
  }
  return 0; // Out of range
};

const SplineCalculator = () => {
  const xi = [2, 4, 6, 8, 10];
  const yi = [9.5, 8.0, 10.5, 39.5, 72.5];
  const n = xi.length;

  const [inputX, setInputX] = useState(0);
  const [result, setResult] = useState(null);

  const slopes = Array.from({ length: n - 1 }, (_, i) => 
    (yi[i + 1] - yi[i]) / (xi[i + 1] - xi[i])
  );

  const handleInputChange = (event) => {
    setInputX(event.target.value);
  };

  const calculateSpline = (e) => {
    e.preventDefault();
    const x = parseFloat(inputX);
    const y = linearSpline(xi, yi, n, x, slopes);
    setResult(y);
  };

  return (
    <Container>
      <h1>Spline Interpolation</h1>
      <h5>Linear Spline</h5>
      <Table striped bordered hover variant="gray" className="mt-4">
        <thead>
          <tr>
            <th>x</th>
            {xi.map((value, index) => (
              <th key={index}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>f(x)</th>
            {yi.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        </tbody>
      </Table>
      <Form onSubmit={calculateSpline}>
        <Form.Group className="mb-3">
          <Form.Label>Enter x:</Form.Label>
          <Form.Control 
            type="number" 
            value={inputX} 
            onChange={handleInputChange} 
            style={{width:"30%", margin:"0 auto"}}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Calculate
        </Button>
      </Form>
      <br />
      <h5>Results:</h5>
      {result !== null && (
        <p>f({inputX}) = {result}</p>
      )}

    </Container>
  );
};

export default SplineCalculator;

