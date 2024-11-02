import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const GaussianElimination = () => {
    const [n, setN] = useState(3); // Default order set to 3
    const [A, setA] = useState(Array.from({ length: 3 }, () => Array(3).fill(0))); // 3x3 matrix
    const [b, setB] = useState(Array(3).fill(0)); // 3x1 vector
    const [results, setResults] = useState([]);

    // Initial values for A and B
    const initialA = [
        [-2, 3, 1],
        [3, 4, -5],
        [1, -2, 1]
    ];
    const initialB = [9, 0, -4];

    // Set initial values if default is 3
    React.useEffect(() => {
        if (n === 3) {
            setA(initialA);
            setB(initialB);
        }
    }, [n]);

    const handleMatrixChange = (i, j, value) => {
        const newA = [...A];
        newA[i][j] = parseFloat(value);
        setA(newA);
    };

    const handleBChange = (i, value) => {
        const newB = [...b];
        newB[i] = parseFloat(value);
        setB(newB);
    };

    const solveEquations = () => {
        const x = Array(n).fill(0);
        let c;
        let sum;

        // Convert to upper triangular matrix
        for (let j = 0; j < n; j++) {
            for (let i = j + 1; i < n; i++) {
                c = A[i][j] / A[j][j];
                for (let k = 0; k < n; k++) {
                    A[i][k] -= c * A[j][k];
                }
                b[i] -= c * b[j];
            }
        }

        // Back substitution
        x[n - 1] = b[n - 1] / A[n - 1][n - 1];
        for (let i = n - 2; i >= 0; i--) {
            sum = 0;
            for (let j = i + 1; j < n; j++) {
                sum += A[i][j] * x[j];
            }
            x[i] = (b[i] - sum) / A[i][i];
        }

        setResults(x);
    };

    return (
        <Container className="text-center">
            <h1>Gaussian Elimination</h1>
            <Form.Group>
                <Form.Label>Order of Matrix:</Form.Label>
                <Form.Control
                    as="select"
                    value={n}
                    onChange={(e) => {
                        const newN = parseInt(e.target.value);
                        setN(newN);
                        setA(Array.from({ length: newN }, () => Array(newN).fill(0))); // Reset A
                        setB(Array(newN).fill(0)); // Reset B
                        setResults([]); // Reset results on change
                    }}
                    style={{width:"26%", margin:"0 auto"}}
                >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </Form.Control>
            </Form.Group>

            <h4>Augmented Matrix (A | B):</h4>
            {Array.from({ length: n }, (_, i) => (
                <div key={i} className="d-flex justify-content-center mb-2">
                    {Array.from({ length: n }, (_, j) => (
                        <Form.Control
                            key={j}
                            type="number"
                            value={A[i][j]}
                            onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                            style={{ width: '80px', marginRight: '5px' }}
                        />
                    ))}
                    <span style={{ marginLeft: '10px', marginRight: '10px' }}>|</span>
                    <Form.Control
                        type="number"
                        value={b[i]}
                        onChange={(e) => handleBChange(i, e.target.value)}
                        style={{ width: '80px', marginLeft: '5px' }}
                    />
                </div>
            ))}
            <br/>
            <Button variant="dark" onClick={solveEquations}>
                Calculate
            </Button>
            <br/>
            <br/>
            <h5>Results:</h5>
            {results.length > 0 && (
                <div>
                    {results.map((result, index) => (
                        <p key={index}>
                            x{index + 1} = {result.toFixed(4)}
                        </p>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default GaussianElimination;

