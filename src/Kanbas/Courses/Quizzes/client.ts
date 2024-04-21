import axios from 'axios';
import { Quiz } from './types/types';
const API_BASE = process.env.REACT_APP_API_BASE;
const QUIZ_API = `${API_BASE}/api`;
axios.defaults.withCredentials = true;

export const findCourseQuizzes = async (courseId: any) => {
  const response = await axios.get(`${QUIZ_API}/${courseId}/quizzes`);
  return response.data;
};
export const createQuiz = async (quiz: any) => {
  const response = await axios.post(`${QUIZ_API}/quizzes`, quiz);
  return response.data;
};
export const deleteQuiz = async (quizId: any) => {
  const response = await axios.delete(`${QUIZ_API}/quizzes/${quizId}`);
  return response.data;
};
export const updateQuiz = async (quizId:string, quiz: Quiz) => {
  const response = await axios.put(`${QUIZ_API}/quizzes/${quizId}`, quiz);
  return response.data;
};
export const findQuizById = async (quizId: string) => {
  const response = await axios.get(`${QUIZ_API}/${quizId}`);
  return response.data;
};
