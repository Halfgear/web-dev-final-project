import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Assignments from "./Assignments";
import Home from "./Home";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Courses() {
    const { courseId } = useParams();
    const location = useLocation();
    const COURSES_API = "http://localhost:4000/api/courses";
    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (courseId?: string) => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}`
        );
        setCourse(response.data);
    };

    const currentPath = location.pathname.split('/').filter(Boolean).pop()
    useEffect(() => {
        findCourseById(courseId);
    }, [courseId]);


    return (
        <div className="courses-container">
            <h1><HiMiniBars3 className="react-icon" />  {course?._id} {course?.name}  {">"}
                <span className="path">{currentPath}</span></h1>
            <hr />
            <CourseNavigation />
            <div>
                <div
                    className="overflow-y-scroll position-fixed bottom-0 end-0 color"
                    style={{ left: "320px", top: "70px", color: "black", fontWeight: "bold" }} >
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<h1 className="tap-title">Piazza</h1>} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:assignmentId" element={<h1 className="tap-title">Assignment Editor</h1>} />
                        <Route path="Grades" element={<h1 className="tap-title">Grades</h1>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
export default Courses;