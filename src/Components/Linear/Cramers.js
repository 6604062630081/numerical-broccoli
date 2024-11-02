import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const CramersRule = () => {
    const [matrix, setMatrix] = useState([
        [-2, 3, 1],
        [3, 4, -5],
        [1, -2, 1]
    ]);
    const [B, setB] = useState([9, 0, -4]);
    const [results, setResults] = useState({ x1: 0, x2: 0, x3: 0 });
    const [showResults, setShowResults] = useState(false);

    const det3x3 = (A) => {
        return (
            A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
            A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
            A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0])
        );
    };

    const solveSystem = () => {
        const x = [];
        const detA = det3x3(matrix);
        
        for (let i = 0; i < 3; i++) {
            const Ai = matrix.map(row => row.slice());
            for (let row = 0; row < 3; row++) {
                Ai[row][i] = B[row];
            }
            const detAi = det3x3(Ai);
            x[i] = detAi / detA;
        }

        setResults({ x1: x[0], x2: x[1], x3: x[2] });
        setShowResults(true);  // Show results after solving
    };

    const handleMatrixChange = (row, col, value) => {
        const newMatrix = matrix.map((r, i) =>
            r.map((c, j) => (i === row && j === col ? parseFloat(value) : c))
        );
        setMatrix(newMatrix);
    };

    const handleBChange = (index, value) => {
        const newB = B.map((b, i) => (i === index ? parseFloat(value) : b));
        setB(newB);
    };

    return (
        <Container className="text-center">
            <h1>Cramer's Rule</h1>
            <div className="d-flex justify-content-center mb-4" style={{ gap: '15px' }}>
                <div>
                    <h4>Matrix A:</h4>
                    <Form>
                        {matrix.map((row, rowIndex) => (
                            <div key={rowIndex} className="d-flex justify-content-center mb-2">
                                {row.map((value, colIndex) => (
                                    <Form.Control
                                        key={colIndex}
                                        type="number"
                                        value={value}
                                        onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                                        style={{ width: '80px', marginRight: '5px' }} // Increased width
                                    />
                                ))}
                            </div>
                        ))}
                    </Form>
                </div>
                <div>
                    <h4>Matrix B:</h4>
                    <Form>
                        {B.map((value, index) => (
                            <div key={index} className="d-flex justify-content-center mb-2">
                                <Form.Control
                                    type="number"
                                    value={value}
                                    onChange={(e) => handleBChange(index, e.target.value)}
                                    style={{ width: '80px' }} // Increased width
                                />
                            </div>
                        ))}
                    </Form>
                </div>
            </div>
            <Button variant="dark" onClick={solveSystem}>
                Calculate
            </Button>
            <br />
            <br />
            <h5>Results</h5>
            {showResults && (
                <div>
                    <p>x1 = {results.x1.toFixed(2)}</p>
                    <p>x2 = {results.x2.toFixed(2)}</p>
                    <p>x3 = {results.x3.toFixed(2)}</p>
                </div>
            )}
        </Container>
    );
};

export default CramersRule;

