import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { findCourseQuizzes } from './client';
import { Link } from 'react-router-dom';
import './index.css';
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

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0'); // Ensures two digits
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Converts 24h to 12h format and handles midnight (0)

    return `${month} ${day} at ${formattedHour}:${minute} ${ampm}`;
};

function QuizList() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { courseId } = useParams();

    const handleAddQuiz = () => {
        // Redirect to the quiz creation page
    };
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

    const getAvailabilityStatus = (quiz: Quiz) => {
        const now = new Date();
        const availableDate = new Date(quiz.availableDate);
        const untilDate = new Date(quiz.untilDate);

        if (now > untilDate) {
            return 'Closed';
        } else if (now >= availableDate && now <= untilDate) {
            return 'Available';
        } else if (now < availableDate) {
            return `Not available until ${formatDate(quiz.availableDate)}`;
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Quiz List</h1>
            <button className="add-quiz-btn" onClick={handleAddQuiz}>+ Quiz</button>
            <div className="quiz-list-container">
                {quizzes.length > 0 ? quizzes.map((quiz, index) => (
                    <div key={index} className="quiz-box">
                        <Link to={`${quiz._id}`} style={{ textDecoration: 'none', display: 'block', flexGrow: 1 }}>
                            <div>
                                <div className="quiz-title" style={{ fontWeight: 'bold' }}>
                                    {quiz.title}
                                </div>
                                <div className="quiz-details">
                                    <span className="availability-status">
                                        {getAvailabilityStatus(quiz)}
                                    </span> |
                                    Due {formatDate(quiz.dueDate)} |
                                    Points: {quiz.points} | {quiz.questions.length} Questions
                                </div>
                            </div>
                        </Link>
                        <span className={`publish-status ${quiz.published ? 'published' : 'unpublished'}`}>
                                        {quiz.published ? '✅' : '🚫'}
                                    </span>
                        <div onClick={(e) => e.stopPropagation()} className="quiz-context-menu">
                            {/* Implement the context menu here */}
                            ...
                        </div>
                    </div>
                )) : <p>No quizzes available. Click "+ Quiz" to add a new one.</p>}
            </div>
        </div>
    );

};

export default QuizList;


