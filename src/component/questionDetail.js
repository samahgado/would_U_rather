import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAnswerOfQuestion } from '../action/questions'
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';




class QuestionDetail extends Component {
    state = {
        selectedAnswer: ''
    }
   
    chooseAnswer(answer) {
        this.setState((prevState) => {
            return {selectedAnswer: answer}
        })
    }
    handleSaveAnswer(e) {
        e.preventDefault()

        const { dispatch, authedUser, id  } = this.props
        const { selectedAnswer } = this.state
    
        dispatch(handleAnswerOfQuestion({
          qid:id,
          authedUser,
          answer: selectedAnswer,
        }))
    }
    render() {
        const { question, author, answered, answer, votesOptionOne, votesOptionTwo, totalVotes, percentageOptionOne, percentageOptionTwo } = this.props;
        const { selectedAnswer } = this.state;

        if (!question) {
            return <Redirect to="/notFound"/>
        }

        return (
            <div className='d-flex justify-content-center' >
            {answered ? (
                    <div  ><h4 className="text-danger" >Asked by {author.name}</h4></div>
                ) : (
                    <div ><h4>{author.name} asks:</h4></div>
                )}
                <div >
                    <div>
                        <img alt="avatar" style={{ width: '10rem' }} className="rounded-circle" src={author.avatarURL}/>
                    </div>
                    
                    {!answered ? (
                        <div >
                            <div >Would you rather</div>
                            <div className=' d-flex justify-content-center'>
                            <form onSubmit={(e) => {this.handleSaveAnswer(e)}} >
                                <div>
                                    <label >
                                       
                                        <input  
                                            
                                            type="radio" 
                                            name='select_option' 
                                            value="optionOne"
                                            onClick={(e) => { this.chooseAnswer('optionOne')}}/>
                                             <span className='input_radio'>{question.optionOne.text}</span>
                                       
                                    </label>
<br/>

                                    <label >
                                        
                                        <input 
                                        
                                            type="radio" 
                                            name='select_option' 
                                            value="optionTwo"
                                            onClick={(e) => { this.chooseAnswer('optionTwo')}}/>
                                            <span className='input_radio'>{question.optionTwo.text}</span>
                                      
                                    </label>
                                </div>
                                <hr/>
                                <Button className="btn btn-success" type='submit'>SAVE</Button>
                            </form>
                            
                        </div>
                        </div>
                    ): (
                        <div >
                        <div><h4>Results: </h4>  </div>
                        <div className={answer === 'optionOne' ?"p-3 mb-2 bg-danger text-white" :"p-3 mb-2 bg-light text-dark" }>
                            <div ><h3>{question.optionOne.text}</h3></div>

                            <div >
                                <div>{votesOptionOne} out of {totalVotes} votes</div>
                                <div>Percentage votes: {percentageOptionOne}%</div>
                            </div>
                        
                        </div>

                        <div className={answer === 'optionTwo' ?"p-3 mb-2 bg-danger text-white" :"p-3 mb-2 bg-light text-dark" }>
                            <div ><h3>{question.optionTwo.text}</h3></div>

                            <div >
                                <div>{votesOptionTwo} out of {totalVotes} votes</div>
                                <div>Percentage votes: {percentageOptionTwo}%</div>
                            </div>
                            
                        </div>
                    </div>
                    )}
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { match }) {
    const { id } = match.params
    const question = questions[id]
    const author = question ? users[question.author] : null
    const answered = question ? (question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1) : false
    const votesOptionOne = (question && question.optionOne.votes) ? question.optionOne.votes.length : 0
    const votesOptionTwo = (question && question.optionTwo.votes) ? question.optionTwo.votes.length : 0
    const totalVotes = votesOptionOne + votesOptionTwo
    const percentageOptionOne = ((votesOptionOne / totalVotes) * 100).toFixed(1)
    const percentageOptionTwo = ((votesOptionTwo / totalVotes) * 100).toFixed(1)

    
    const answer = users[authedUser].answers[id]
  
    return {
        id,
        authedUser,
        question,
        author,
        answered,
        answer,
        votesOptionOne,
        votesOptionTwo,
        totalVotes,
        percentageOptionOne,
        percentageOptionTwo
    }
}

export default connect(mapStateToProps)(QuestionDetail);