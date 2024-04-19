import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;
const QUIZ_API = `${API_BASE}/api`;
axios.defaults.withCredentials = true;

export const findCourseQuizzes = async (courseId: string) => {
  const response = await axios.get(`${QUIZ_API}/${courseId}/quizzes`);
  return response.data;
};
export const createQuiz = async (courseId: any, quiz: any) => {
  const response = await axios.post(`${QUIZ_API}/${courseId}/quizzes`, quiz);
  return response.data;
};
export const deleteQuiz = async (quizId: any) => {
  const response = await axios.delete(`${QUIZ_API}/${quizId}`);
  return response.data;
};
export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(`${QUIZ_API}/${quiz._id}`, quiz);
  return response.data;
};
export const findQuizById = async (quizId: string) => {
  const response = await axios.get(`${QUIZ_API}/${quizId}`);
  return response.data;
};
