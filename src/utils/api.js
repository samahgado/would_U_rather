import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
  } from "./_DATA";
  
  export function getInitialData() {
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => ({
        users,
        questions
      })
    );
  }
  
  export function saveQuestion(question) {
    return Promise.all([_saveQuestion(question)]).then(([question]) => question);
  }
  
  export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info);
  }

  
  
  
