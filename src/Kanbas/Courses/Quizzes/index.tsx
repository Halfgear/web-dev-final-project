import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { createQuiz, findCourseQuizzes } from './client';
import { Link } from 'react-router-dom';
import { Quiz } from './types/types';
import { formatDate } from './utils';
import './index.css';

function QuizList() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { courseId } = useParams();

    //randomly genreate ID
    const defaultQuiz: Quiz = {
        _id: Math.random().toString(36).substring(7),
        courseId: '', 
        title: 'New Quiz',
        description: 'Description of the quiz',
        quizType: 'Standard',
        points: 0,
        assignmentGroup: '',
        shuffleAnswers: false,
        timeLimit: 60, // Default time limit in minutes
        published: false,
        multipleAttempts: true,
        showCorrectAnswers: 'After Last Attempt',
        accessCode: '',
        oneQuestionAtATime: false,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: '',
        availableDate: '',
        untilDate: '',
        questions: [] // Empty questions array, to be populated as needed
    };
    const handleAddQuiz = async () => {
        try {
            const newQuiz = { ...defaultQuiz, courseId: courseId }; // Ensure courseId is set correctly
            const createdQuiz = await createQuiz(newQuiz); // Assume createQuiz is an async function that posts the quiz to your backend and returns the newly created quiz
            if (createdQuiz) {
                setQuizzes(prevQuizzes => [...prevQuizzes, createdQuiz]);
            }
        } catch (error) {
            console.error('Failed to create new quiz', error);
            setError('Failed to add new quiz');
        }
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
    }, [courseId, quizzes]);

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


