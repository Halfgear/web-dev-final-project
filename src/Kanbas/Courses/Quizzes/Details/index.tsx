import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";

interface QuizDetailsProps {
    quizId: string;
}

const QuizDetails= () => {
    const [quiz, setQuiz] = useState<any>(null);
    const { quizId } = useParams();
    
    useEffect(() => {
        // Fetch quiz details from API using quizId
        // Replace the API_URL with your actual API endpoint
        fetch(`API_URL/quizzes/${quizId}`)
            .then((response) => response.json())
            .then((data) => setQuiz(data))
            .catch((error) => console.error(error));
    }, [quizId]);

    if (!quiz) {
        return <div>Loading quiz details...</div>;
    }

    return (
        <div>
            <h1>{quiz.title}</h1>
            <p>{quiz.description}</p>
            {/* Render quiz questions and options here */}
        </div>
    );
};

export default QuizDetails;