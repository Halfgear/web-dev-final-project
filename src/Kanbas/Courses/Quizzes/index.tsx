import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { findCourseQuizzes } from './client';
import { Link } from 'react-router-dom';
interface Question {
    _id: string;
    question_type: number;
    points: number;
    description: string;
    answers: (string | number)[];
    correct: (string | number)[];
}

interface Quiz {
    _id: string;
    courseId: string;
    title: string;
    description: string;
    quizType: string;
    points: number;
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit: number;
    published: boolean;
    multipleAttempts: boolean;
    showCorrectAnswers: string;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: string;
    availableDate: string;
    untilDate: string;
    questions: Question[];
}

interface Params {
    courseId: string;
}

function QuizList() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { courseId } = useParams();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await findCourseQuizzes(courseId || '');
                setQuizzes(data || []);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch quizzes');
                setLoading(false);
                setQuizzes([]);
            }
        };

        fetchQuizzes();
    }, [courseId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Quiz List</h1>
            {quizzes.map((quiz, index) => (
                <div key={index}>
                    <h2>
                        <Link to={`${quiz._id}`} className="btn btn-primary">{quiz._id}</Link>
                        {quiz.title} ({quiz.quizType})
                    </h2>
                    <p>{quiz.description}</p>
                    <ul>
                        <li>Points: {quiz.points}</li>
                        <li>Assignment Group: {quiz.assignmentGroup}</li>
                        <li>Shuffle Answers: {quiz.shuffleAnswers ? 'Yes' : 'No'}</li>
                        <li>Time Limit: {quiz.timeLimit} minutes</li>
                        <li>Published: {quiz.published ? 'Yes' : 'No'}</li>
                        <li>Multiple Attempts Allowed: {quiz.multipleAttempts ? 'Yes' : 'No'}</li>
                        <li>Show Correct Answers: {quiz.showCorrectAnswers}</li>
                        <li>One Question At A Time: {quiz.oneQuestionAtATime ? 'Yes' : 'No'}</li>
                        <li>Webcam Required: {quiz.webcamRequired ? 'Yes' : 'No'}</li>
                        <li>Lock Questions After Answering: {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</li>
                        <li>Due Date: {new Date(quiz.dueDate).toLocaleString()}</li>
                        <li>Available Date: {new Date(quiz.availableDate).toLocaleString()}</li>
                        <li>Until Date: {new Date(quiz.untilDate).toLocaleString()}</li>
                    </ul>
                    <h3>Questions</h3>
                    <ol>
                        {quiz.questions.map((question, qIndex) => (
                            <li key={qIndex}>
                                {question.description}
                                {question.answers.length > 0 && (
                                    <ul>
                                        {question.answers.map((answer, aIndex) => (
                                            <li key={aIndex}>{answer}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            ))}
        </div>
    );
};

export default QuizList;


