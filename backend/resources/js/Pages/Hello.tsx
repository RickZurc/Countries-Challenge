import React, { useState } from 'react';

const Hello: React.FC = () => {
    const [num1, setNum1] = useState<number>(0);
    const [num2, setNum2] = useState<number>(0);
    const [result, setResult] = useState<number | null>(null);

    const handleAddition = () => {
        setResult(num1 + num2);
    };

    return (
        <div>
            <h1>Hello, World!</h1>
            <p>Welcome to the Hello page.</p>
            <div>
                <h2>Simple Calculator</h2>
                <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(Number(e.target.value))}
                    placeholder="Enter first number"
                />
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(Number(e.target.value))}
                    placeholder="Enter second number"
                />
                <button onClick={handleAddition}>Add</button>
                {result !== null && <p>Result: {result}</p>}
            </div>
        </div>
    );
};

export default Hello;