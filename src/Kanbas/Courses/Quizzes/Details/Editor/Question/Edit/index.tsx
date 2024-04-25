import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { findQuizById, updateQuestion } from '../../../../client';
import { Question, Quiz } from '../../../../types/types';
import { Editor } from '@tinymce/tinymce-react';
import { FaTrashAlt } from 'react-icons/fa';
import "../../../index.css";

export function EditQuestion() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [question, setQuestion] = useState<Question | null>(null);
    const { quizId, questionId } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    var questionDetailsScreen = pathname.substring(0, pathname.lastIndexOf("/"));
    questionDetailsScreen = questionDetailsScreen.substring(0, questionDetailsScreen.lastIndexOf("/"));


    const fetchQuiz = async () => {
        try {
            const quizData = await findQuizById(quizId);
            setQuiz(quizData);
            setQuestion(quizData.questions.find((q: Question) => q._id === questionId));
        } catch (err) {
            console.error('Error fetching quiz:', err);
        }
    };

    useEffect(() => {
        fetchQuiz();
    }, [quizId, questionId]);

    if (!quiz || !question) {
        return <div>Loading...</div>;
    }

    const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = parseInt(e.target.value, 10);
        const updatedQuestion = { ...question, question_type: newType };
        setQuestion(updatedQuestion);
    };

    const handleQuizTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQuestion = { ...question, title: e.target.value };
        setQuestion(updatedQuestion);
    };

    const handleQuizNewAnswer = () => {
        let updatedQuestion: Question = { ...question };
        const newAnswer = '';
        updatedQuestion.answers.push(newAnswer);
        setQuestion(updatedQuestion);
    };

    const handleQuizDeleteAnswer = (index: number) => {
        let updatedQuestion: Question = { ...question };
        console.log(index)
        console.log(updatedQuestion.answers)
        const newAnswers = updatedQuestion.answers.filter(x => updatedQuestion.answers.indexOf(x) !== index);
        updatedQuestion = {...updatedQuestion, answers: newAnswers};
        console.log(updatedQuestion.answers)
        setQuestion(updatedQuestion);
    };

    const handleQuizChangeAnswer = (index: number, value: ChangeEvent<HTMLInputElement>) => {
        let updatedQuestion: Question = { ...question };
        updatedQuestion.answers[index] = value.target.value;
        setQuestion(updatedQuestion);
    };

    const handleQuizChangeCorrectAnswer = (index: string) => {
        let updatedQuestion: Question = { ...question };
        updatedQuestion.correct = [];
        updatedQuestion.correct.push(index);
        setQuestion(updatedQuestion);
    };

    const handleEditorChange = (content: any) => {
        const updatedQuestion = { ...question, description: content };
        setQuestion(updatedQuestion);
    };

    const handlePointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQuestion = { ...question, points: Number(e.target.value) };
        setQuestion(updatedQuestion);
    };

    const handleUpdateQuestion = async () => {
        try {
            await updateQuestion(quizId, question);
            console.log("Question updated");
            navigate(-1);
        } catch (err) {
            console.error("Error updating question:", err);
        }
    };

    const renderAnswerOptions = () => {
        switch (question.question_type) {
            case 1: // Multiple Choice
                return (
                    <div className="ans-container">
                        {question.answers.map((answer, index) => (
                            <div className="mult-choice" key={index}>
                                <input
                                    id='index'
                                    defaultChecked={question.correct.includes(answer)}
                                    type="radio"
                                    name={question._id}
                                    onChange={() => handleQuizChangeCorrectAnswer(index.toString())}
                                />
                                <label className={(question.correct.includes(index.toString()) ? 'correct mult-choice-label' : 'mult-choice-label')}>

                                    {question.correct.includes(index.toString()) ? 'Correct Answer' : 'Possible Answer'}

                                    <input
                                        id={'MultChoiceIDLabel' + index}
                                        className={"enter-box mult-choice-ans"}
                                        type="text"
                                        defaultValue={String(answer)}
                                        onChange={(e) => handleQuizChangeAnswer(index, e)}
                                    />
                                </label>
                                <button className="btn-answer" onClick={() => handleQuizDeleteAnswer(index)}><FaTrashAlt /></button>
                            </div>
                        ))}
                        <button className='btn-answer' onClick={() => handleQuizNewAnswer()}>
                            + New Answer
                        </button>
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
                                onChange={() => handleQuizChangeCorrectAnswer('true')}
                            />
                            <label className={(question.correct.includes('true') ? "correct mult-choice-label" : 'mult-choice-label')}>True</label>
                        </div>

                        <div>
                            <input
                                defaultChecked={question.correct.includes('false')}
                                type="radio"
                                name={question._id}
                                onChange={() => handleQuizChangeCorrectAnswer('false')}
                            />
                            <label className={(question.correct.includes('false') ? 'correct mult-choice-label' : 'mult-choice-label')}>False</label>
                        </div>
                    </div>
                );

            case 3: // Fill in the Blank
                return (
                    <div className="ans-container">
                        Answers:
                        {question.answers.map((answer, index) => (
                            <div key={index}>
                                {index + 1}
                                <input
                                    className="enter-box mult-choice-ans"
                                    type="text"
                                    defaultValue={String(answer)}
                                    onChange={(e) => handleQuizChangeAnswer(index, e)}
                                />
                                <button className="btn-answer" onClick={() => handleQuizDeleteAnswer(index)}><FaTrashAlt /></button>
                            </div>
                        ))}
                        <button className='btn-answer' onClick={() => handleQuizNewAnswer()}>
                            + New Answer
                        </button>
                    </div>
                );

            default:
                return <div>Unknown question type</div>;
        }
    };

    return (
        <div>
            <h1>Question Editor</h1>
            <div className="question-container">
                <h2>Question Editor</h2>
                <div className='question-header'>
                    <input
                        className="enter-box"
                        type="text"
                        id="title"
                        value={question.title}
                        onChange={handleQuizTitleChange}
                    />
                    <select
                        className="enter-box"
                        id="questionType"
                        value={question.question_type}
                        onChange={handleQuestionTypeChange}
                    >
                        <option value={1}>Multiple Choice</option>
                        <option value={2}>True/False</option>
                        <option value={3}>Fill in the Blank</option>
                    </select>
                    <div className="float-end">
                        pts:
                        <input
                            className="enter-box point"
                            type="number"
                            min={0}
                            defaultValue={question.points}
                            onChange={handlePointChange}
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
                    {renderAnswerOptions()}
                </div>
            </div>
            <button className="btn-link btn-save question-edit-btn" onClick={handleUpdateQuestion}>
                Update Question
            </button>
            <Link to={questionDetailsScreen}>
                <button className="btn-link btn-save question-edit-btn">
                    Cancel
                </button>
            </Link>
        </div>
    );
}

export default EditQuestion;

