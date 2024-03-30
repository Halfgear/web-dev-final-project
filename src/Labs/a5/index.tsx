import React from 'react';
import EncodingParametersInURLs from './EncodingParametersInURLs';
import WorkingWithObjects from './WorkingWithObjects';
import WorkingWithArrays from './WorkingWithArrays';
function Assignment5() {
    const API_BASE = process.env.REACT_APP_API_BASE;
    return (
        <div>
            <h1>Assignment 5</h1>
            <a href={`${API_BASE}/a5/welcome`}>
                Welcome
            </a>
            < WorkingWithArrays />
            < EncodingParametersInURLs />
            < WorkingWithObjects />
        </div>
    );
}

export default Assignment5;