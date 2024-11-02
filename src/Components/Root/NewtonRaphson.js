import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { derivative, evaluate } from 'mathjs';

const NewtonRaphson = () => {
    const [root, setRoot] = useState('0.000000');
    const [equation, setEquation] = useState('x - (7^(1/2))'); // Editable equation
    const [initialGuess, setInitialGuess] = useState(2.0); // Editable initial guess

    const cal = (x) => {
        return evaluate(equation, { x });
    };

    const calDerivative = (x) => {
        const d = derivative(equation, 'x').toString();
        return evaluate(d, { x });
    };

    const calculateRoot = () => {
        let xi = parseFloat(initialGuess);
        let x0, x1;
        let i = 0;

        do {
            x0 = xi;
            x1 = x0 - (cal(x0) / calDerivative(x0));
            i++;
            xi = x1;
        } while (Math.abs(((x1 - x0) / x1) * 100) > 0.000001);

        setRoot(x1.toFixed(6));
    };

    return (
        <Container>
            <h1>Newton-Raphson Method</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input
                        type="text"
                        value={equation}
                        onChange={(e) => setEquation(e.target.value)}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Initial Guess (x<sub>0</sub>):</Form.Label>
                    <input
                        type="number"
                        value={initialGuess}
                        onChange={(e) => setInitialGuess(parseFloat(e.target.value))}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>

            <br></br>
                <div className="mt-3">
                    <h5>Answer = {root}</h5>
                </div>
            
        </Container>
    );
};

export default NewtonRaphson;

