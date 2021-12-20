
import { receiveUsers } from './users'
import { getInitialData } from '../utils/api.js';
import { getQuestions } from './questions';



export function handleInitialData() {
    return (dispatch) => {
        getInitialData()
        .then (({questions, users}) => {
            dispatch(getQuestions(questions))
            dispatch(receiveUsers(users))
        })
    }
}
