import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./index.css";

function Quiz() {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const QUIZ_API = `${API_BASE}/api/quizzes`;
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState<any[]>([]);

    //need to add courseID to parameter later.
    const getQuizzesByCourseId = async () => {
        const response = await axios.get(`${QUIZ_API}`);
        console.log(response.data);
        setQuiz(response.data.filter((quiz: any) => quiz._id === quizId));
    };

    useEffect(() => { getQuizzesByCourseId(); }, [courseId]);
    return (
        <div className="list-group wd-modules quiz">
            {quiz.map((x) => (
                <div>
                    <ul className="list-group">
                        {x.questions.map((q: any) => (
                            <li className="list-group-item">
                                <ul className="list-group question">
                                    <li className="question-header">
                                        <div className="question-header">
                                            Question X
                                        </div>
                                        <div className="points question-header">
                                            {q.points}pts
                                        </div>
                                    </li>
                                    <li>
                                        {q.description}
                                    </li>
                                    <div>
                                        {(() => {
                                            switch (q.question_type) {
                                                case 1:
                                                    return q.answers.map((a: any) => (
                                                        <div>
                                                            <input type="radio" value={a} name="radio-answer" id={q._id} />
                                                            <label htmlFor={q._id}>{a}</label><br />
                                                        </div>
                                                    ))
                                                case 2:
                                                    return (
                                                        <div>
                                                            <input type="radio" value="true" name="check-answer" id={q._id} />
                                                            <label htmlFor={q._id}>True</label> <br />
                                                            <input type="radio" value="false" name="check-answer" id={q._id} />
                                                            <label htmlFor={q._id}>False</label> <br />
                                                        </div>
                                                    )
                                                case 3:
                                                    return <textarea cols={1} rows={1}> </textarea>
                                                default:
                                                    return null
                                            }
                                        })()}
                                    </div>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
export default Quiz;