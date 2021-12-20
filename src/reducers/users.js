
import { RECEIVE_USERS } from '../action/users'
import {  ADD_QUESTION} from '../action/questions'
import { ANSWER_OF_QUESTION } from '../action/questions';


export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ANSWER_OF_QUESTION: 
			return {
				...state,
				[action.authedUser]: {
			        ...state[action.authedUser],
			        answers: {
			        	...state[action.authedUser].answers,
			            [action.qid]: action.answer
			        }
			    }
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.author]: {
                    ...state[action.author],
                    questions: state[action.author].questions.concat([action.id])
                }
            }
        default:
            return state
    }
}