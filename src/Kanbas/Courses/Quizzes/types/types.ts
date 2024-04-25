export interface Question {
    _id: string;
    title: string;
    question_type: number;
    points: number;
    description: string;
    answers: (string | number)[];
    correct: (string | number)[];
}

export interface Quiz {
    _id: string;
    courseId: string;
    title: string;
    description: string;
    quizType: string;
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
