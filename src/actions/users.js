export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER_USER = "ADD_ANSWER_USER";
export const ADD_QUESTION_USER = "ADD_QUESTION_USER";

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

export const addAnswerUser = (authedUser, questionId, answer) => {
  return {
    type: ADD_ANSWER_USER,
    authedUser,
    qid: questionId,
    answer,
  };
};

export const addQuestionUser = ({author, id}) => {
  return {
      type: ADD_QUESTION_USER,
      author,
      qid: id,
  };
}
