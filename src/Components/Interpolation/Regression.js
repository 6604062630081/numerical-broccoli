import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const LinearRegression = () => {
  const xi = [10, 15, 20, 30, 40, 50, 60, 70, 80];
  const yi = [5, 9, 15, 18, 22, 30, 35, 38, 43];
  const n = xi.length;

  const [inputX, setInputX] = useState(0);
  const [result, setResult] = useState(null);

  const linearRegression = (xi, yi, n, x) => {
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (let i = 0; i < n; i++) {
      sumX += xi[i];
      sumY += yi[i];
      sumXY += xi[i] * yi[i];
      sumXX += xi[i] * xi[i];
    }
    const a1 = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const a0 = (sumY - a1 * sumX) / n;

    return a0 + a1 * x;
  };

  const handleInputChange = (event) => {
    setInputX(event.target.value);
  };

  const calculateRegression = (e) => {
    e.preventDefault();
    const x = parseFloat(inputX);
    const fx = linearRegression(xi, yi, n, x);
    setResult(fx);
  };

  return (
    <Container>
      <h1>Regression</h1>
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
      <Form onSubmit={calculateRegression}>
        <Form.Group className="mb-3">
          <Form.Label>Enter x:</Form.Label>
          <Form.Control 
            type="number" 
            value={inputX} 
            onChange={handleInputChange} 
            placeholder="Enter x"
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
        <p>f({inputX}) = {result.toFixed(2)}</p>
      )}
    </Container>
  );
};

export default LinearRegression;



