import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addAnswerUser, addQuestionUser } from "./users";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

export const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

export const addAnswerQuestion = (author, questionId, answer) => {
  return {
    type: ADD_ANSWER_QUESTION,
    author,
    qid: questionId,
    answer,
  };
};

export const handleAddQuestion = (firstOption, secondOption) => {
  return (dispatch, getState) => {
      const { authedUser } = getState();

      return saveQuestion(authedUser.id, firstOption, secondOption)
          .then((question) => {
              dispatch(addQuestion(question));
              dispatch(addQuestionUser(question))
          })
  };
}

export const handleAddAnswer = (questionId, answer) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer(authedUser.id, questionId, answer).then(() => {
      dispatch(addAnswerQuestion(authedUser.id, questionId, answer));
      dispatch(addAnswerUser(authedUser.id, questionId, answer));
    });
  };
};
