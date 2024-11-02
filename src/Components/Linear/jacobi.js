import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const JacobiMethod = () => {
    const EPSILON = 0.000001;
    const [n, setN] = useState(4); // Default to 4
    const [a, setA] = useState([
        [5, 2, 0, 0],
        [2, 5, 2, 0],
        [0, 2, 5, 2],
        [0, 0, 2, 5]
    ]);
    const [b, setB] = useState([12, 17, 14, 7]);
    const [results, setResults] = useState([]);
    const [iterations, setIterations] = useState(0);

    const handleMatrixChange = (i, j, value) => {
        const newA = [...a];
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
        const T = Array(n).fill(0);
        let iterCount = 0;

        while (true) {
            let converged = true;
            for (let i = 0; i < n; i++) {
                T[i] = b[i]; // Start with the constant term
                for (let j = 0; j < n; j++) {
                    if (j !== i) {
                        T[i] -= a[i][j] * x[j]; // Subtract contributions from other variables
                    }
                }
                T[i] /= a[i][i]; // Divide by the diagonal element
            }

            for (let i = 0; i < n; i++) {
                const k = Math.abs(T[i] - x[i]);
                if (k > EPSILON) {
                    converged = false; // If any value has not converged, set converged to false
                }
                x[i] = T[i]; // Update current solution with the new values
            }

            iterCount++; // Increment iteration count
            
            if (converged) break; // Exit if all values have converged
        }

        setResults(x);
        setIterations(iterCount); // Set the iteration count
    };

    const isInputValid = () => {
        return a.flat().every(val => !isNaN(val)) && b.every(val => !isNaN(val));
    };

    return (
        <Container className="text-center">
            <h1>Jacobi Method</h1>
            <Form.Group>
                <Form.Label>Number of Equations:</Form.Label>
                <Form.Control
                    as="select"
                    value={n}
                    onChange={(e) => {
                        const newN = parseInt(e.target.value);
                        setN(newN);
                        // Initialize empty arrays for the new size
                        setA(Array.from({ length: newN }, () => Array(newN).fill(0)));
                        setB(Array.from({ length: newN }, () => 0));
                        setResults([]); // Reset results on change
                        setIterations(0); // Reset iterations on change
                    }}
                    style={{ width: "25%", margin: "0 auto" }}
                >
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </Form.Control>
            </Form.Group>

            <div className="d-flex justify-content-center mb-4" style={{ gap: '15px' }}>
                <div>
                    <h4>Matrix A:</h4>
                    {Array.from({ length: n }, (_, i) => (
                        <div key={i} className="d-flex justify-content-center mb-2">
                            {Array.from({ length: n }, (_, j) => (
                                <Form.Control
                                    key={j}
                                    type="number"
                                    value={a[i][j]}
                                    onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                                    style={{ width: '80px', marginRight: '5px' }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    <h4>Matrix B:</h4>
                    {Array.from({ length: n }, (_, i) => (
                        <div key={i} className="d-flex justify-content-center mb-2">
                            <Form.Control
                                type="number"
                                value={b[i]}
                                onChange={(e) => handleBChange(i, e.target.value)}
                                style={{ width: '80px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <br />
            <Button variant="dark" onClick={solveEquations} disabled={!isInputValid()}>
                Calculate
            </Button>
            <br />
            <br />
            <h5>Results:</h5>
            {results.length > 0 && (
                <div>
                    {results.map((result, index) => (
                        <p key={index}>
                            x{index + 1} = {result.toFixed(4)}
                        </p>
                    ))}
                    <p>Iterations: {iterations}</p>
                </div>
            )}
        </Container>
    );
};

export default JacobiMethod;
