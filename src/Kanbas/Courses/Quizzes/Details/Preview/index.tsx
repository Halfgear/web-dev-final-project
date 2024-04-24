import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { findQuizById } from "../../client";
import "./index.css";
import { Question, Quiz } from "../../types/types";
import { formatDate, calculateTotalPoints } from "../../utils";
import { FaQuestionCircle } from "react-icons/fa";

// This is quiz Preview screen generated by copliot for now
function QuizPreview() {
    const [quiz, setQuiz] = useState<Quiz>(null as any);
    const [curQuestion, setCurQuestion] = useState(0)
    const { quizId } = useParams();
    const [totalPoints, setTotalPoints] = useState(0);

    const questionHeadRender = (question: Question) => {
        return <div>
            <div className='question-header'>
                {question.title}
                <div className='float-end'>
                    {question.points} pts
                </div>

            </div>

            <div className='question-body'>
                <br />
                <span dangerouslySetInnerHTML={{ __html: question.description }}></span>

                {questionRender(question)}
            </div>

        </div>
    }

    const questionRender = (question: Question) => {
        switch (question.question_type) {
            // Multiple Choice
            case 1:
                return <div className='ans-container'>
                    {question.answers.map((answer, index) => (
                        <div className='mult-choice q-space' key={index}>
                            <hr className="question-hr" />
                            <input type='radio' name={question._id} />
                            <label className='mult-choice-label' htmlFor={question._id}>{answer}</label>
                        </div>
                    ))}
                </div>

            // True or False
            case 2:
                return <div className='ans-container'>
                    <div className='mult-choice'>
                        <div className="q-space">
                            <hr className="question-hr" />
                            <input type='radio' name={question._id} />
                            <label className='mult-choice-label' htmlFor={question._id}>True</label>
                        </div>
                        <div className="q-space">
                            <hr className="question-hr" />
                            <input type='radio' name={question._id} />
                            <label className='mult-choice-label' htmlFor={question._id}>False</label>
                        </div>
                    </div>
                </div>

            // Fill in the Blank
            case 3:
                return <div className='ans-container'>
                    {question.correct.map((answer, index) => (
                        <div className="q-space" key={index}>
                            <hr className="question-hr" />
                            {index + 1}
                            <input className='enter-box mult-choice-ans' type="text" id="title" />
                        </div>
                    ))}
                </div>

            default:
                return
        }
    }

    const fetchQuizDetails = async () => {
        try {
            const quizData = await findQuizById(quizId);
            setQuiz(quizData);
            if (quizData.questions) {
                const total = calculateTotalPoints(quizData.questions);
                setTotalPoints(total);
            }
        } catch (error) {
            console.error('Failed to fetch quiz:', error);
        }
    };

    useEffect(() => {
        fetchQuizDetails();
    }, [quizId]);

    if (!quiz) {
        return <div>Loading quiz details...</div>;
    }

    return (
        <div className="quiz-preview">
            <h1>Quiz Preview</h1>
            <div>
                <div>
                    <h2>{quiz.title}</h2>
                    <span dangerouslySetInnerHTML={{ __html: quiz.description }}></span>
                    <p>{totalPoints} points</p>
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
                            </div>
                        )
                            : ('')}
                    </div>
                ))}
            </div>

            <div>
                Questions:
                {quiz.questions.map((question, index) => (
                    <div className="q-prev-list" key={index}>
                        <button className="btn-answer" onClick={() => setCurQuestion(index)}>
                            <FaQuestionCircle className="q-circle" />
                            {index === curQuestion ? (<b>Question: {index + 1}</b>)
                                : (<text>Question: {index + 1}</text>)}

                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}
export default QuizPreview;