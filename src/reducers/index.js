import { combineReducers } from 'redux';
import authedUser from './autheduser';
import questions from './questions';
import users from './users';

export default combineReducers({
  
  users,
  authedUser,

  
  questions,
  
});
