import React, { useState, useEffect } from "react";
import axios from "axios";

function WorkingWithArrays() {
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    const [todos, setTodos] = useState<any[]>([]);
    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };
    const deleteTodo = async (todo: any) => {
        const response = await axios.delete(`${API}/${todo.id}`);
        setTodos(todos.filter((t) => t.id !== todo.id));
    };

    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    const removeTodo = async (todo: { id: any; }) => {
        const response = await axios
            .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };

    const fetchTodoById = async (id: any) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };

    const updateTodo = async () => {
        const response = await axios.put(`${API}/${todo.id}`, todo);
        setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    };

    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };


    useEffect(() => {
        fetchTodos();
    }, []);
    const API_BASE = process.env.REACT_APP_API_BASE;
    const API = `${API_BASE}/a5/todos`;

    return (
        <div>
            <hr />
            <h2>Working with Arrays</h2>
            <input value={todo.id} readOnly />
            <input onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                value={todo.title} type="text" />
            <br /><br />
            <textarea value={todo.description}
                onChange={(e) => setTodo({
                    ...todo,
                    description: e.target.value
                })} />
            <br />
            <input value={todo.due} type="date" onChange={(e) => setTodo({
                ...todo, due: e.target.value
            })} />
            <br />
            <label>
                <input value={todo.completed.toString()} type="checkbox"
                    onChange={(e) => setTodo({
                        ...todo, completed: e.target.checked
                    })} />
                Completed
            </label>
            <br />
            <button onClick={() => deleteTodo(todo)} className="btn btn-danger">
                Delete
            </button>
            <button className='btn btn-primary' onClick={postTodo}>
                Post Todo
            </button>
            <button className='btn btn-success' onClick={updateTodo}>
                Update Todo
            </button>
            <br />
            <ul>
                {todos.map((todo: any) => (
                    <li key={todo.id} className="list-group-item">
                        {todo.title}
                        <button
                            style={{ marginLeft: '20px', marginRight: '10px' }}
                            className='btn btn-danger'
                            onClick={() => removeTodo(todo)} >
                            Remove
                        </button>
                        <button
                            className='btn btn-warning'
                            onClick={() => fetchTodoById(todo.id)} >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>

            <h3>Updating an Item in an Array</h3>
            <a className='btn btn-primary' href={`${API}/${todo.id}/title/${todo.title}`} >
                Update Title to {todo.title}
            </a>
            <h4>Retrieving Arrays</h4>
            <a className='btn btn-primary'
                href={API}>
                Get Todos
            </a>
            <br />
            <h4>Retrieving an Item from an Array by ID</h4>
            <input value={todo.id}
                onChange={(e) => setTodo({
                    ...todo,
                    id: parseInt(e.target.value)
                })} />
            <a className='btn btn-primary' href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
            <br />
            <h3>Filtering Array Items</h3>
            <a className='btn btn-primary' href={`${API}?completed=true`}>
                Get Completed Todos
            </a>
            <br />
            <h3>Creating new Items in an Array</h3>
            <a className='btn btn-primary' href={`${API}/create`}>
                Create Todo
            </a>
            <br />
            <h3>Deleting from an Array</h3>
            <a className='btn btn-primary' href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a>
            <br />
            <h3>Complete from an array</h3>
            <a className='btn btn-primary' href={`${API}/${todo.id}/completed/true`}>
                Complete Todo ID = 1 = ${todo.id}
            </a>
            <br />
            <h3>Describe from an array</h3>
            <input type="text" value={todo.description}
                onChange={(e) => setTodo({
                    ...todo, description: e.target.value
                })} />
            <br />
            <a className='btn btn-primary' href={`${API}/${todo.id}/description/${todo.description}`}>
                Describe Todo ID = ${todo.id}
            </a>
            <hr />
        </div>
    );
}
export default WorkingWithArrays;