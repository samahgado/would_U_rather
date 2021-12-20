import { saveQuestion , saveQuestionAnswer ,} from "../utils/api"

export  const GET_QUESTIONS = "GET-QUESTIONS"
export const ADD_QUESTION = "ADD_QUESTION"
export const ANSWER_OF_QUESTION = "ANSWER_OF_QUESTION"



  export function getQuestions(questions){
    
    return{
        type:GET_QUESTIONS,
        questions
    }
}




 function addQuestion({ id,timestamp,author,optionOne,optionTwo}){
    return{
        type:ADD_QUESTION,
        id,
        timestamp,
        author,
        optionOne,
        optionTwo
    }
}


export function handleAddQuestion(optionOneText,optionTwoText){
    return (dispatch,getState) =>{
        const {authedUser} = getState()
        const qInfo = {
            author:authedUser,
            optionOneText,
            optionTwoText
        }
        return saveQuestion (qInfo)
        .then((question) => dispatch(addQuestion(question)))
        .catch((error) => {
            console.log("error",error)
        }
        )
    }

}


function answerOfQuestion({authedUser,qid,answer}){
    return{
        type :ANSWER_OF_QUESTION,
        authedUser,
        qid,
        answer

    }
}


export  function handleAnswerOfQuestion(info){
    return (dispatch) =>{
        dispatch(answerOfQuestion(info))
        return saveQuestionAnswer(info)
        .then(()=> console.log("answered"))
        .catch((error) =>  {
            console.log("error",error)
        })
    }
}
