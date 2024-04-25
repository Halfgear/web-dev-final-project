import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import QuizNav from '../Nav';
import { findQuizById, updateQuiz } from '../../../client';
import { Question, Quiz } from '../../../types/types';
import { FaQuestionCircle } from 'react-icons/fa';
import { calculateTotalPoints, formatDate } from '../../../utils';
import '../../index.css';

export function QuestionEditor() {
    const [quiz, setQuiz] = useState<Quiz>(null as any);
    const [curQuestion, setCurQuestion] = useState(0);
    const { quizId } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    var quizDetailsScreen = pathname.substring(0, pathname.lastIndexOf("/"));
    quizDetailsScreen = quizDetailsScreen.substring(0, quizDetailsScreen.lastIndexOf("/"));
    var quizListScreen = quizDetailsScreen.substring(0, quizDetailsScreen.lastIndexOf("/"));

    const defaultQuestion: Question = {
        _id: Math.random().toString(36).substring(7),
        title: 'default question title',
        question_type: 1,
        points: 1,
        description: 'description here',
        answers: [],
        correct: [],
    };
    const fetchQuizDetails = async () => {
        try {
            const quizData = await findQuizById(quizId);
            setQuiz(quizData);
        } catch (error) {
            console.error('Failed to fetch quiz:', error);
        }
    };

    useEffect(() => {
        fetchQuizDetails();
    }, [quizId]);

    // when update button is hit, this code updates the database
    const handleupdateQuiz = async (quiz: Quiz) => {
        try {
            await updateQuiz(quiz);
        } catch (err) {
            console.log(err);
        }
    };

    // Toggles Publish and then updates quiz (used for Save and Publish Button)
    const publishAndUpdate = () => {
        const updatedQuiz = { ...quiz, published: true };
        setQuiz(updatedQuiz);
        handleupdateQuiz(updatedQuiz);
    }
    
    const noPublishAndUpdate = () => {
        handleupdateQuiz(quiz);
    }

    const addDefaultQuestion = async () => {
        if (quiz) {
            const updatedQuiz = { ...quiz, questions: [...quiz.questions, defaultQuestion] };
            setQuiz(updatedQuiz);
        }
    };

    const removeQuestion = async (questionId: string) => {
        if (quiz) {
            const updatedQuiz = {
                ...quiz,
                questions: quiz.questions.filter((question) => question._id !== questionId),
            };
            setQuiz(updatedQuiz);
            setCurQuestion(0);
        }
    }

    const saveQuestion = async () => {
        if (quiz) {
            try {
                await updateQuiz(quiz);
                console.log("Quiz updated");
                navigate(-1);
            } catch (err) {
                console.error("Error updating quiz:", err);
            }
        }
    }

    const questionHeadRender = (question: Question) => (
        <div>
            <div className="question-header">
                {question.title}
                <div className="float-end">{question.points} pts</div>
            </div>

            <div className="question-body">
                <span dangerouslySetInnerHTML={{ __html: question.description }}></span>
                {questionRender(question)}
            </div>
        </div>
    );

    const questionRender = (question: Question) => {
        switch (question.question_type) {
            case 1: // Multiple Choice
                return (
                    <div className="ans-container">
                        {question.answers.map((answer, index) => (
                            <div className="mult-choice q-space" key={index}>
                                <hr className="question-hr" />
                                <input type="radio" name={question._id} />
                                <label className="mult-choice-label">{answer}</label>
                            </div>
                        ))}
                    </div>
                );

            case 2: // True or False
                return (
                    <div className="ans-container">
                        <div className="mult-choice">
                            <div className="q-space">
                                <hr className="question-hr" />
                                <input type="radio" name={question._id} />
                                <label className="mult-choice-label">True</label>
                            </div>
                            <div className="q-space">
                                <hr className="question-hr" />
                                <input type="radio" name={question._id} />
                                <label className="mult-choice-label">False</label>
                            </div>
                        </div>
                    </div>
                );

            case 3: // Fill in the Blank
                return (
                    <div className="ans-container">
                        {question.correct.map((answer, index) => (
                            <div className="q-space" key={index}>
                                <hr className="question-hr" />
                                {index + 1}
                                <input
                                    className="enter-box mult-choice-ans"
                                    type="text"
                                    id="title"
                                    defaultValue={String(answer)}
                                />
                            </div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    const handleEdit = async (questionId: string) => {
        if (quiz) {
            await updateQuiz(quiz);
        }
        // Navigate to the EditQuestion page with the quizId and questionId
        navigate(`./${questionId}/Edit`)
    };

    if (!quiz) {
        return <div>Loading quiz details...</div>;
    }

    return (
        <div className="quiz-preview">
            <QuizNav />
            <h1>Quiz Preview</h1>
            <div>
                <div>
                    <h2>{quiz.title}</h2>
                    <span dangerouslySetInnerHTML={{ __html: quiz.description }}></span>
                    <p>{calculateTotalPoints(quiz.questions)} points</p>
                    <p>Time limit: {quiz.timeLimit} minutes</p>
                    <p>Due: {formatDate(quiz.dueDate)}</p>
                </div>
            </div>

            <div>
                {quiz.questions.map((question, index) => (
                    <div key={index}>
                        {index === curQuestion ? (
                            <div>
                                {questionHeadRender(question)}
                                <button
                                    className="btn-edit question-edit-btn"
                                    onClick={() => handleEdit(question._id)}>
                                    Edit
                                </button>
                                <button
                                    className="btn-edit question-edit-btn"
                                    onClick={() => removeQuestion(question._id)}>
                                    Delete
                                </button>
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>

            <div>
                Questions:
                {quiz.questions.map((question, index) => (
                    <div className="q-prev-list" key={index}>
                        <button className="btn-answer" onClick={() => setCurQuestion(index)}>
                            <FaQuestionCircle className="q-circle" />
                            {index === curQuestion ? (
                                <b>Question: {index + 1}</b>
                            ) : (
                                <span>Question: {index + 1}</span>
                            )}
                        </button>
                    </div>
                ))}
                <button className="btn-edit question-add-btn" onClick={addDefaultQuestion}>
                    Add Question
                </button>
            </div>

            <div className='save-bar'>
                <Link to={quizListScreen}>
                    <button className="btn-link" >Cancel</button>
                </Link>
                <Link to={quizListScreen}>
                    <button className="btn-link" onClick={publishAndUpdate}>Save and Publish</button>
                </Link>
                <Link to={quizDetailsScreen}>
                    <button className="btn-link btn-save" onClick={noPublishAndUpdate}>Save</button>
                </Link>
            </div>

        </div>
    );
}
export default QuestionEditor;
