import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function saveQuestion(author, optionOneText, optionTwoText) {
  return _saveQuestion({author, optionOneText, optionTwoText});
}

export const saveQuestionAnswer = (authedUserId, qId, answer) => {
  return _saveQuestionAnswer({
    authedUser: authedUserId,
    qid: qId,
    answer,
  });
};
