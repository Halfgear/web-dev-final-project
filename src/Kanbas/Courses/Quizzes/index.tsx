
import React, { useEffect, useState } from 'react';

// This is quiz list screen
const QuizList: React.FC = () => {
    const [quizzes, setQuizzes] = useState<string[]>([]);

    useEffect(() => {
        // Fetch the list of quizzes from an API or database
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('/api/quizzes');
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                console.error('Failed to fetch quizzes:', error);
            }
        };

        fetchQuizzes();
    }, []);

    return (
        <div>
            <h1>Quiz List</h1>
            {quizzes.length > 0 ? (
                <ul>
                    {quizzes.map((quiz) => (
                        <li key={quiz}>{quiz}</li>
                    ))}
                </ul>
            ) : (
                <p>No quizzes available.</p>
            )}
        </div>
    );
};

export default QuizList;