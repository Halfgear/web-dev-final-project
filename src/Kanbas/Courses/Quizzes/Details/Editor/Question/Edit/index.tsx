import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findQuizById, updateQuiz } from '../../../../client';
import { Question, Quiz } from '../../../../types/types';
import { FaTrashAlt } from 'react-icons/fa';
import { Editor } from '@tinymce/tinymce-react';

export function EditQuestion() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const { quizId, questionId } = useParams();

    const fetchQuiz = async () => {
        try {
            const quizData = await findQuizById(quizId);
            setQuiz(quizData);
        } catch (err) {
            console.error('Error fetching quiz:', err);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [quizId]);

    if (!quiz) {
        return <div>Loading quiz details...</div>;
    }

    // Find the specific question using the questionId
    const question = quiz.questions.find(q => q._id === questionId);

    if (!question) {
        return <div>Question not found</div>;
    }

    const handleQuizTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQuiz = { ...quiz, title: e.target.value };
        setQuiz(updatedQuiz);
    };

    const handleEditorChange = (content: any) => {
        const updatedQuiz = { ...quiz, description: content };
        setQuiz(updatedQuiz);
    };

    const handleUpdateQuiz = async () => {
        try {
            await updateQuiz(quiz);
            console.log("Quiz updated");
        } catch (err) {
            console.error("Error updating quiz:", err);
        }
    };

    const questionHeadRender = (question: Question) => {
        return (
            <div>
                <div className="question-header">
                    <input
                        className="enter-box"
                        type="text"
                        id="title"
                        value={question.title}
                        onChange={(e) => handleQuizTitleChange(e)}
                    />
                    <select className="enter-box" id="questionType">
                        <option selected={question.question_type === 1} value="Mult">Multiple Choice</option>
                        <option selected={question.question_type === 2} value="TF">True/False</option>
                        <option selected={question.question_type === 3} value="FillInBlank">Fill in the Blank</option>
                    </select>
                    <div className="float-end">
                        pts:
                        <input
                            className="enter-box point"
                            type="number"
                            min={0}
                            defaultValue={question.points}
                        />
                    </div>
                </div>
                <div className="question-body">
                    <Editor
                        apiKey='ayfauai55c5w2b1fo820wvi93k42dh0irg5jz7qz9ai3kdw2'
                        init={{
                            plugins: 'autolink markdown lists link image media table wordcount',
                            toolbar: 'undo redo | bold italic underline strikethrough | numlist bullist | link image media',
                            height: 200,
                        }}
                        value={question.description}
                        onEditorChange={handleEditorChange}
                    />
                    {questionRender(question)}
                </div>
            </div>
        );
    };

    const questionRender = (question: Question) => {
        switch (question.question_type) {
            case 1: // Multiple Choice
                return (
                    <div className="ans-container">
                        Answers:
                        {question.answers.map((answer, index) => (
                            <div className="mult-choice" key={index}>
                                <input
                                    defaultChecked={question.correct.includes(answer)}
                                    type="radio"
                                    name={question._id}
                                />
                                <label className="mult-choice-label">
                                    {question.correct.includes(answer) ? 'Correct Answer' : 'Possible Answer'}
                                    <input
                                        className="enter-box mult-choice-ans"
                                        type="text"
                                        defaultValue={String(answer)}
                                    />
                                </label>
                                <button className="btn-answer"><FaTrashAlt /></button>
                            </div>
                        ))}
                    </div>
                );

            case 2: // True/False
                return (
                    <div className="ans-container">
                        <div>
                            <input
                                defaultChecked={question.correct.includes('true')}
                                type="radio"
                                name={question._id}
                            />
                            <label className="mult-choice-label">
                                {question.correct.includes('true') ? 'True' : 'True'}
                            </label>
                        </div>

                        <div>
                            <input
                                defaultChecked={question.correct.includes('false')}
                                type="radio"
                                name={question._id}
                            />
                            <label className="mult-choice-label">
                                {question.correct.includes('false') ? 'False' : 'False'}
                            </label>
                        </div>
                    </div>
                );

            case 3: // Fill in the Blank
                return (
                    <div className="ans-container">
                        Possible Correct Answers:
                        {question.correct.map((answer, index) => (
                            <div key={index}>
                                <input
                                    className="enter-box mult-choice-ans"
                                    type="text"
                                    defaultValue={String(answer)}
                                />
                                <button className="btn-answer"><FaTrashAlt /></button>
                            </div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div>
            <h1>Question Editor</h1>

            <button className="btn-link btn-save" onClick={handleUpdateQuiz}>
                Update Quiz
            </button>

            <div className="question-container">
                <h2>Question Editor</h2>
                {questionHeadRender(question)}
            </div>
        </div>
    );
}

export default EditQuestion;
