import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import "./index.css";
import { Link } from 'react-router-dom';
import { Quiz } from '../types/types';
import { updateQuiz } from '../client';
import { FaEdit } from 'react-icons/fa';
import { findQuizById } from '../client';

const QuizDetails = () => {
    const [quiz, setQuiz] = useState<any>(null);
    const { quizId } = useParams();

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const quizData = await findQuizById(quizId);
                setQuiz(quizData); // Set the quiz data into state
            } catch (error) {
                console.error('Failed to fetch quiz:', error);
            }
        };

        fetchQuizDetails(); // Call the async function to fetch quiz details
    }, [quizId]);

    if (!quiz) {
        return <div>Loading quiz details...</div>;
    }

    const handlePublishToggle = async (quizId: string, quiz: Quiz) => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        try {
            await updateQuiz(updatedQuiz);
            setQuiz(updatedQuiz);
        } catch (error) {
            console.error('Failed to toggle publish status', error);
        }
    };

    return (
        <div>
            <div className="button-container">
                <button
                    className={`btn ${quiz.published ? 'btn-published' : 'btn-unpublished'}`}
                    onClick={() => handlePublishToggle(quiz._id, quiz)}
                >
                    {quiz.published ? 'Unpublish' : 'Publish'}
                </button>
                <Link to={`Editor/Details`} className="btn-link"><FaEdit /> EDIT</Link>
                <Link to={`Preview`} className="btn-link">Preview</Link>
            </div>
            <hr />
            <h1>{quiz.title}</h1>
            <table>
                <tbody>
                    <tr>
                        <td className='list-bold'><b>Quiz Type</b></td>
                        <td>{quiz.quizType}</td>
                    </tr>
                    <tr>
                        <td className='list-bold'><b>Points</b></td>
                        <td>{quiz.points}</td>
                    </tr>
                    <tr>
                        <td className='list-bold'><b>Assignment Group</b></td>
                        <td>{quiz.assignmentGroup}</td>
                    </tr>
                    <tr>
                        <td className='list-bold'><b>Shuffle Answers</b></td>
                        <td>{quiz.shuffleAnswers ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td className='list-bold'><b>Time Limit</b></td>
                        <td>{quiz.timeLimit} minutes</td>
                    </tr>
                    <tr>
                        <td className='list-bold'><b>Multiple Attempts</b></td>
                        <td>{quiz.multipleAttempts ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td className='list-bold'><b>Show Correct Answers</b></td>
                        <td>{quiz.showCorrectAnswers}</td>
                    </tr>
                    <tr>
                        <td className='list-bold'><b>Access Code</b></td>
                        <td>{quiz.accessCode}</td>
                    </tr>
                    <tr>
                        <td className='list-bold'><b>One Question at a Time</b></td>
                        <td>{quiz.oneQuestionAtATime ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td className='list-bold'><b>Webcam Required</b></td>
                        <td>{quiz.webcamRequired ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <td className='list-bold'><b>Lock Questions After Answering</b></td>
                        <td>{quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <table>
                <tbody>
                    <tr className='bordered'>
                        <td><b>Due</b></td>
                        <td><b>Available From</b></td>
                        <td><b>Until</b></td>
                    </tr>
                    <tr>
                        <td className='date'>{new Date(quiz.dueDate).toLocaleString()}</td>
                        <td className='date'>{new Date(quiz.availableDate).toLocaleString()}</td>
                        <td className='date'>{new Date(quiz.untilDate).toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
            {/* Render quiz questions and options here */}
        </div>
    );
};

export default QuizDetails;