import {GET_QUESTIONS } from '../action/questions'
import { ANSWER_OF_QUESTION, ADD_QUESTION } from '../action/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ANSWER_OF_QUESTION:
            return {
                ...state,
                [action.qid]: {
			        ...state[action.qid],
			        [action.answer]: {
			        	...state[action.qid][action.answer],
			            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.id]: action
            }
        default:
            return state
    }
}

