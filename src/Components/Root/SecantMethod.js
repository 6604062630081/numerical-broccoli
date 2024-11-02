import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from 'mathjs';

const SecantMethod = () => {
    const [equation, setEquation] = useState('(x^2)-7'); // Default equation
    const [x0, setX0] = useState('');
    const [x1, setX1] = useState('');
    const [result, setResult] = useState('0.000000');
    const [iterations, setIterations] = useState(0);

    const evaluateEquation = (x) => {
        return evaluate(equation, { x });
    };

    const calculateRoot = (x0Num, x1Num) => {
        let x2;
        let i = 0;

        do {
            x2 = x1Num - evaluateEquation(x1Num) * (x1Num - x0Num) / (evaluateEquation(x1Num) - evaluateEquation(x0Num));
            x0Num = x1Num;
            x1Num = x2;
            i++;
        } while (Math.abs(evaluateEquation(x2)) > 0.000001);

        setResult(x2.toFixed(6));
        setIterations(i);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const x0Num = parseFloat(x0);
        const x1Num = parseFloat(x1);
        calculateRoot(x0Num, x1Num);
    };

    return (
        <Container>
            <h1>Secant Method</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input
                        type="text"
                        value={equation}
                        onChange={(e) => setEquation(e.target.value)}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                    <Form.Label>Input x0</Form.Label>
                    <input
                        type="number"
                        value={x0}
                        onChange={(e) => setX0(e.target.value)}
                        required
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                    <Form.Label>Input x1</Form.Label>
                    <input
                        type="number"
                        value={x1}
                        onChange={(e) => setX1(e.target.value)}
                        required
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Calculate
                </Button>
            </Form>
            <br></br>
              <div>
                  <h5>Answer = {result}</h5>
              </div>
                {/* {result && (
                    <p>Number of iterations: {iterations}</p>
                )} */}
        </Container>
    );
};

export default SecantMethod;

