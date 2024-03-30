import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "./reducer";
import { KanbasState } from "../../store";
import React, { useEffect, useState } from "react";
import * as client from "./client";

function ModuleList() {
    const { courseId } = useParams();
    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);
    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };
    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };

    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();
    return (
        <>
            {<><button type="button">Collapse All</button>
                <button type="button">View Progress</button>
                <label htmlFor="select-one-genre"></label>
                <select id="select-one-genre">
                    <option value="WEEK0">Week 0</option>
                    <option value="WEEK1">Week 1</option>
                    <option value="LEARNING OBJECTIVES"
                        selected>Publish All</option>
                </select>
                <button type="button">Module</button></>
            }
            <hr />
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <button onClick={handleAddModule}>
                        Add
                    </button>
                    <button onClick={handleUpdateModule}>
                        Update
                    </button>
                    <input value={module.name}
                        onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))
                        } />
                    <textarea
                        value={module.description}
                        onChange={(e) =>
                            dispatch(setModule({ ...module, description: e.target.value }))
                        } />
                </li>

                {moduleList
                    .filter((module) => module.course === courseId)
                    .map((module, index) => (
                        <li key={index} className="list-group-item">
                            <button
                                onClick={() => dispatch(setModule(module))}>
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteModule(module._id)}>
                                Delete
                            </button>
                            <hr />
                            <div>
                                <FaEllipsisV className="me-2" />
                                {module.name}
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaPlusCircle className="ms-2" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </div>
                            <div>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <p>{module.description}</p>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    ))}
            </ul>
        </>
    );
}
export default ModuleList;

