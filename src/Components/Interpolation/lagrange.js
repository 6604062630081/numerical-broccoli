import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const LagrangeInterpolation = () => {
  const xValues = [0, 20000, 40000, 60000, 80000];
  const f = [9.81, 9.7487, 9.6879, 9.6879, 9.5682];

  const [x, setX] = useState(0);
  const [method, setMethod] = useState("linear");
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(2);
  const [p3, setP3] = useState(3);
  const [linearResult, setLinearResult] = useState(null);
  const [quadraticResult, setQuadraticResult] = useState(null);

  const linearInterpolation = (x, p1, p2) => {
    const result =
      f[p1] * (xValues[p2] - x) / (xValues[p2] - xValues[p1]) +
      f[p2] * (xValues[p1] - x) / (xValues[p1] - xValues[p2]);
    return result;
  };

  const quadraticInterpolation = (x, p1, p2, p3) => {
    const result =
      f[p1] * ((xValues[p2] - x) * (xValues[p3] - x)) / ((xValues[p2] - xValues[p1]) * (xValues[p3] - xValues[p1])) +
      f[p2] * ((xValues[p1] - x) * (xValues[p3] - x)) / ((xValues[p1] - xValues[p2]) * (xValues[p3] - xValues[p2])) +
      f[p3] * ((xValues[p1] - x) * (xValues[p2] - x)) / ((xValues[p1] - xValues[p3]) * (xValues[p2] - xValues[p3]));
    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const p1Index = p1 - 1;
    const p2Index = p2 - 1;
    const p3Index = p3 - 1;

    if (method === "linear") {
      const y_linear = linearInterpolation(x, p1Index, p2Index);
      setLinearResult(y_linear);
      setQuadraticResult(null); // Clear previous quadratic result
    } else {
      const y_quadratic = quadraticInterpolation(x, p1Index, p2Index, p3Index);
      setQuadraticResult(y_quadratic);
      setLinearResult(null); // Clear previous linear result
    }
  };

  return (
    <Container>
      <h1>Lagrange Interpolation</h1>
      <Table striped bordered hover variant="gray">
        <thead>
          <tr>
            <th>x</th>
            {xValues.map((value, index) => (
              <th key={index}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>f(x)</th>
            {f.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        </tbody>
      </Table>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter x:</Form.Label>
          <Form.Control
            type="text"
            value={x}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setX(value === '' ? 0 : Number(value));
              }
            }}
            style={{width:"30%", margin:"0 auto"}}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Choose interpolation method:</Form.Label>
          <Form.Select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={{width:"30%", margin:"0 auto"}}
          >
            <option value="linear">Linear</option>
            <option value="quadratic">Quadratic</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter point 1 (1 to 5):</Form.Label>
          <Form.Control
            type="number"
            value={p1}
            onChange={(e) => setP1(Number(e.target.value))}
            min="1"
            max="5"
            style={{width:"30%", margin:"0 auto"}}
          />
        </Form.Group>
        {method === "linear" && (
          <Form.Group className="mb-3">
            <Form.Label>Enter point 2 (1 to 5):</Form.Label>
            <Form.Control
              type="number"
              value={p2}
              onChange={(e) => setP2(Number(e.target.value))}
              min="1"
              max="5"
              style={{width:"30%", margin:"0 auto"}}
            />
          </Form.Group>
        )}
        {method === "quadratic" && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Enter point 2 (1 to 5):</Form.Label>
              <Form.Control
                type="number"
                value={p2}
                onChange={(e) => setP2(Number(e.target.value))}
                min="1"
                max="5"
                style={{width:"30%", margin:"0 auto"}}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter point 3 (1 to 5):</Form.Label>
              <Form.Control
                type="number"
                value={p3}
                onChange={(e) => setP3(Number(e.target.value))}
                min="1"
                max="5"
                style={{width:"30%", margin:"0 auto"}}
              />
            </Form.Group>
          </>
        )}
        <Button variant="dark" type="submit">
          Calculate
        </Button>
      </Form>
      <br></br>
      <h5>Results:</h5>
      {linearResult !== null && (
        <div>
          <p>Linear Interpolation: f({x}) = {linearResult.toFixed(4)}</p>
        </div>
      )}
      {quadraticResult !== null && (
        <div>
          <p>Quadratic Interpolation: f({x}) = {quadraticResult.toFixed(4)}</p>
        </div>
      )}


    </Container>
  );
};

export default LagrangeInterpolation;
