import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkingWithObjects() {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: 2, name: "NodeJS module",
        description: "Create a NodeJS module", completed: false, score: 0,
    });
    const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`
    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);

    const MODULE_URL = `${API_BASE}/a5/module`
    return (
        <div>
            <hr />
            <h3>Working With Objects</h3>
            <h3>Modifying Properties</h3>
            <input onChange={(e) => setAssignment({
                ...assignment, title: e.target.value
            })}
                value={assignment.title} type="text" />
            <button onClick={updateTitle} >
                Update Title to: {assignment.title}
            </button>
            <button onClick={fetchAssignment} >
                Fetch Assignment
            </button>
            <h4> On my own section</h4>
            <a className="btn btn-primary"
                href={`${API_BASE}/a5/module`}>
                Get Module
            </a>
            <br />
            <a className="btn btn-primary"
                href={`${API_BASE}/a5/module/name`}>
                Get Module Name
            </a>
            <br />
            <a className="btn btn-primary"
                href={`${MODULE_URL}/score/${module.score}`}>
                Update score
            </a>
            <input type="number"
                onChange={(e) => setModule({
                    ...module,
                    score: Number(e.target.value)
                })}
                value={module.score} />
            <br />
            <a className="btn btn-primary"
                href={`${MODULE_URL}/completed/${module.completed}`}>
                Update completed check the small box below to update to true
            </a>
            <br />
            <input className="form-check-input"
                type="checkbox"
                onChange={(e) => setModule({
                    ...module,
                    completed: e.target.checked
                })}
                checked={module.completed} />
            <br />
            <h4>Retrieving Objects</h4>
            <a className="btn btn-primary"
                href={`${ASSIGNMENT_URL}`}>
                Get Assignment
            </a>
            <h4>Retrieving Properties</h4>
            <a className="btn btn-primary"
                href={`${ASSIGNMENT_URL}/title`}>
                Get Title
            </a>
            <br />
            <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input type="text"
                onChange={(e) => setAssignment({
                    ...assignment,
                    title: e.target.value
                })}
                value={assignment.title} />
            <hr />
        </div>
    );
}
export default WorkingWithObjects;