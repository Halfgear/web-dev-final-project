import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizNav from '../Nav';
import { findQuizById } from '../../../client';
import { Question, Quiz } from '../../../types/types';
import { FaQuestionCircle } from 'react-icons/fa';
import { calculateTotalPoints, formatDate } from '../../../utils';
import './index.css';

export function QuestionEditor() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [curQuestion, setCurQuestion] = useState(0);
    const { quizId } = useParams();
    const navigate = useNavigate();
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
                                <input type="radio" name={question._id} />
                                <label className="mult-choice-label">True</label>
                            </div>
                            <div className="q-space">
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

    const handleEdit = (questionId: string) => {
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
                                    className="btn-edit"
                                    onClick={() => handleEdit(question._id)}
                                >
                                    Edit
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
            </div>

        </div>
    );
}
export default QuestionEditor;
