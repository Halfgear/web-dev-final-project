import React, { useEffect, useState } from 'react';
import axios from "axios";

function EncodingParametersInURLs() {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const [a, setA] = useState(34);
    const [b, setB] = useState(23);
    const [result, setResult] = useState(0);
    const fetchSum = async (a: number, b: number) => {
        const response = await
            axios.get(`${API_BASE}/a5/add/${a}/${b}`);
        setResult(response.data);
    };
    const fetchSubtraction = async (a: number, b: number) => {
        const response = await axios.get(
            `${API_BASE}/a5/subtract/${a}/${b}`);
        setResult(response.data);
    };
    const [welcome, setWelcome] = useState("");
    const fetchWelcome = async () => {
        const response = await axios.get(`${API_BASE}/a5/welcome`);
        setWelcome(response.data);
    };
    useEffect(() => {
        fetchWelcome();
        fetchSum(a, b);
        fetchSubtraction(a, b);
    }, []);

    const handleSetA = (e: { target: { value: string; }; }) => setA(parseInt(e.target.value, 10) || 0);
    const handleSetB = (e: { target: { value: string; }; }) => setB(parseInt(e.target.value, 10) || 0);

    return (
        <div>
            <h3>Encoding Parameters In URLs</h3>
            <h4>Integrating React with APIs</h4>
            <h5>Fetching Welcome</h5>
            <h6>{welcome}</h6>
            <h4>Calculator</h4>
            <input
                type="number"
                value={a}
                onChange={handleSetA}
            />
            <br />
            <input
                type="number"
                value={b}
                onChange={handleSetB}
            />
            <br />
            <input value={result} type="number" readOnly />
            <br />
            <h3>Fetch Result</h3>
            <button className="btn btn-primary" onClick={() => fetchSum(a, b)} >
                Fetch Sum of {a} + {b}
            </button>
            <button className="btn btn-danger" onClick={() => fetchSubtraction(a, b)} >
                Fetch Substraction of {a} - {b}
            </button>

            <h3>Path Parameters</h3>
            <a className='btn btn-primary'
                href={`${API_BASE}/a5/add/${a}/${b}`}>
                Add {a} + {b}
            </a>
            <br />
            <a className='btn btn-danger'
                href={`${API_BASE}/a5/subtract/${a}/${b}`}>
                Subtract {a} - {b}
            </a>
            <a className='btn btn-primary'
                href={`${API_BASE}/a5/multiply/${a}/${b}`}>
                Multiply {a} + {b}
            </a>
            <a className='btn btn-danger'
                href={`${API_BASE}/a5/divide/${a}/${b}`}>
                Divide {a} - {b}
            </a>
            <h3>Query Parameters</h3>
            <a className="btn btn-primary"
                href={`${API_BASE}/a5/calculator?operation=add&a=${a}&b=${b}`}>
                Add {a} + {b}
            </a>
            <a className="btn btn-danger"
                href={`${API_BASE}/a5/calculator?operation=subtract&a=${a}&b=${b}`}>
                Substract {a} - {b}
            </a>
            <a className="btn btn-primary"
                href={`${API_BASE}/a5/calculator?operation=multiply&a=${a}&b=${b}`}>
                Multiply {a} + {b}
            </a>
            <a className="btn btn-danger"
                href={`${API_BASE}/a5/calculator?operation=divide&a=${a}&b=${b}`}>
                Divide {a} - {b}
            </a>
        </div>
    );
}

export default EncodingParametersInURLs;
