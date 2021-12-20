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

  export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }
  export function getInitialQuestions() {
    return _getQuestions()
        .then(questions => ({
            questions 
        }))
}
  
export function getInitialUsers() {
  return _getUsers()
      .then(users => ({
         users 
      }))
}