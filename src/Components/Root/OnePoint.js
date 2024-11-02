import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";

const OnePoint = () => {
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState(null);

    const func = (x, a) => Math.pow(x, 2) - a;

    const sqrtApprox = (a) => {
        let x0 = 0.0;
        let i = 0;

        // Find initial interval for root
        while (true) {
            if (func(i, a) * func(i + 1, a) <= 0) {
                x0 = (i + (i + 1)) / 2.0;
                break;
            }
            i++;
        }

        // Iteratively approximate the square root
        while (Math.abs(func(x0, a)) > 0.00001) {
            x0 = (x0 + a / x0) / 2.0;
        }

        return x0;
    };

    const handleCalculate = () => {
        const a = parseFloat(inputValue);
        if (!isNaN(a) && a >= 0) {
            const approximateRoot = sqrtApprox(a);
            setResult(approximateRoot.toFixed(5));
        } else {
            alert("Please enter a valid non-negative number.");
            setResult(null);
        }
    };

    return (
        <Container className="text-center">
            <h1>One Point Iteration</h1>
            <h5>Square Root Approximation</h5>
            <Form className="d-flex flex-column align-items-center">
                <Form.Group className="mb-3">
                    <Form.Label>Enter a number to find its square root:</Form.Label>
                    <Form.Control
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="e.g. 9"
                        style={{ width: "80%", margin:"0 auto" }}
                    />
                </Form.Group>
                <Button variant="dark" onClick={handleCalculate}>
                    Calculate
                </Button>
            </Form>
            <br />
            {result !== null && (
                <h5>√{inputValue} ≈ {result}</h5>
            )}
        </Container>
    );
};

export default OnePoint;


