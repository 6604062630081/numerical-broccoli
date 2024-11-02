import React, { useState } from 'react';
import { Container, Button, Form, Table } from 'react-bootstrap';

const FalsePosition = () => {
    const [root, setRoot] = useState('0.000000');
    const [xl, setXl] = useState(1.5);
    const [xr, setXr] = useState(2.0);
    const [formula, setFormula] = useState('(x^4) - 13');
    const [iterations, setIterations] = useState([]);

    const cal = (x) => {
        const formattedFormula = formula.replace(/\^/g, '**');
        try {
            return Function('x', `return ${formattedFormula};`)(x);
        } catch (e) {
            console.error("Error evaluating formula:", e);
            return NaN;
        }
    };

    const calculateRoot = () => {
        let x0 = 0;
        let e = 1;
        let localXl = xl;
        let localXr = xr;
        let iter = 0;
        const newIterations = [];

        do {
            const x1 = ((localXl * cal(localXr)) - (localXr * cal(localXl))) / (cal(localXr) - cal(localXl));
            iter++;

            newIterations.push({
                iteration: iter,
                xl: localXl,
                xr: localXr,
                x1: x1,
            });

            if (cal(x1) * cal(localXr) < 0) {
                localXl = x1;
            } else {
                localXr = x1;
            }
            e = Math.abs((x1 - x0) / x1) * 100;
            x0 = x1;

        } while (e > 0.000001);

        setRoot(x0.toFixed(6));
        setIterations(newIterations);
    };

    return (
        <Container>
            <h1>False Position Method</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input
                        type="text"
                        value={formula}
                        onChange={(e) => setFormula(e.target.value)}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>XL</Form.Label>
                    <input
                        type="number"
                        value={xl}
                        onChange={(e) => setXl(parseFloat(e.target.value))}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>XR</Form.Label>
                    <input
                        type="number"
                        value={xr}
                        onChange={(e) => setXr(parseFloat(e.target.value))}
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
            

            {iterations.length > 0 && (
                <Table striped bordered hover variant="dark" className="mt-3">
                    <thead>
                        <tr>
                            <th>Iteration</th>
                            <th>XL</th>
                            <th>XR</th>
                            <th>X1</th>
                        </tr>
                    </thead>
                    <tbody>
                        {iterations.map((iter, index) => (
                            <tr key={index}>
                                <td>{iter.iteration}</td>
                                <td>{iter.xl}</td>
                                <td>{iter.xr}</td>
                                <td>{iter.x1}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default FalsePosition;




