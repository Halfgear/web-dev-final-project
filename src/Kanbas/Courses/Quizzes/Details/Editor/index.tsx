import React, { useState } from 'react';

interface QuizEditorProps {
    // Add any necessary props here
}

const QuizEditor: React.FC<QuizEditorProps> = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleQuizTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuizTitle(e.target.value);
    };

    const handleQuestionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQuestions: string[] = [...questions];
        updatedQuestions[index] = e.target.value;
        // setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        // setQuestions([...questions, '']);
    };

    const removeQuestion = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
    };

    return (
        <div>
            <h1>Quiz Editor</h1>
            <label htmlFor="quizTitle">Quiz Title:</label>
            <input type="text" id="quizTitle" value={quizTitle} onChange={handleQuizTitleChange} />

            <h2>Questions:</h2>
            {questions.map((question, index) => (
                <div key={index}>
                    <input type="text" value={question} onChange={(e) => handleQuestionChange(index, e)} />
                    <button onClick={() => removeQuestion(index)}>Remove</button>
                </div>
            ))}

            <button onClick={addQuestion}>Add Question</button>
        </div>
    );
};

export default QuizEditor;