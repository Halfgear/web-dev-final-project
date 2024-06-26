import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { createQuiz, findCourseQuizzes, deleteQuiz, updateQuiz } from './client';
import { Link } from 'react-router-dom';
import { Quiz } from './types/types';
import { calculateTotalPoints, formatDate } from './utils';
import './index.css';

function QuizList() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [contextMenu, setContextMenu] = useState<{ [key: string]: boolean }>({});
    const toggleContextMenu = (quizId: string) => {
        setContextMenu(prev => ({ ...prev, [quizId]: !prev[quizId] }));
    };
    //randomly genreate ID
    const defaultQuiz: Quiz = {
        _id: Math.random().toString(36).substring(7),
        courseId: '',
        title: 'New Quiz',
        description: 'Description of the quiz',
        quizType: 'Standard',
        assignmentGroup: '',
        shuffleAnswers: true,
        timeLimit: 20, // in minutes
        published: false,
        multipleAttempts: false,
        showCorrectAnswers: 'After Last Attempt',
        accessCode: '',
        oneQuestionAtATime: true,
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
                navigate(`./${createdQuiz._id}`);
            }
        } catch (error) {
            console.error('Failed to create new quiz', error);
            setError('Failed to add new quiz');
        }
    };
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await findCourseQuizzes(courseId);
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
    const handleEditQuiz = (quizId: string) => {
        navigate(`./${quizId}/editor/Details`);
    };
    const handleDeleteQuiz = async (quizId: string) => {
        try {
            await deleteQuiz(quizId);
            setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz._id !== quizId));
        } catch (error) {
            console.error('Failed to delete quiz', error);
            setError('Failed to delete quiz');
        }
    };

    const handlePublishToggle = async (quizId:string, quiz:Quiz) => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        try {
            await updateQuiz(updatedQuiz);
            setQuizzes(prevQuizzes => prevQuizzes.map(q => q._id === quiz._id ? updatedQuiz : q));
        } catch (error) {
            console.error('Failed to toggle publish status', error);
            setError('Failed to update quiz');
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
                                    Points: {calculateTotalPoints(quiz.questions)} | {quiz.questions.length} Questions
                                </div>
                            </div>
                        </Link>
                        <span className={`publish-status ${quiz.published ? 'published' : 'unpublished'}`}>
                            {quiz.published ? '✅' : '🚫'}
                        </span>
                        <button className="context-menu-button" onClick={(e) => {
                            e.stopPropagation();
                            toggleContextMenu(quiz._id);
                        }}>⋮</button>
                        {contextMenu[quiz._id] && (
                            <div className="quiz-context-menu">
                                <button onClick={() => handleEditQuiz(quiz._id)}>Edit</button>
                                <button onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
                                <button onClick={() => handlePublishToggle(quiz._id, quiz)}>
                                    {quiz.published ? 'Unpublish' : 'Publish'}
                                </button>
                            </div>
                        )}
                    </div>
                )) : <p>No quizzes available. Click "+ Quiz" to add a new one.</p>}
            </div>
        </div>
    );
};

export default QuizList;


