import { useState } from 'react';
import './App.css';

type MousePosition = {
    x: number;
    y: number;
};

function App() {
    const [count, setCount] = useState(0);
    const [position, setPosition] = useState<MousePosition>({
        x: 0,
        y: 0,
    });

    return (
        <div onMouseOver={(event) => setPosition({ x: event.clientX, y: event.clientY })}>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            <span>{JSON.stringify(position)}</span>
        </div>
    );
}

export default App;
