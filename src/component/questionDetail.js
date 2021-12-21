import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAnswerOfQuestion } from '../action/questions'

import { Button } from 'react-bootstrap';




class QuestionDetail extends Component {
    state = {
        selectedRadio: ""
    }
   
    choosenRadio(selectedRadio) {
        this.setState(() => {
          return  {selectedRadio}
        })
    }
    handleSubmit(e) {
        e.preventDefault()

        const { dispatch, authedUser, id  } = this.props
        const { selectedRadio } = this.state
    
        dispatch(handleAnswerOfQuestion({
          qid:id,
          authedUser,
          answer: selectedRadio,
        }))
    }
    render() {
        const {  author, hadAnswered,  percentageOptionOne,percentageOptionTwo,totalVotes,optionOneVotes,optionTwoVotes ,optionOne,optionTwo,optionOneAnswered,optionTwoAnswered} = this.props;
        

       

        return (
            <div className='d-flex justify-content-center' >
                {!hadAnswered ?(
                    <div>
                    <div>
                    <img alt="avatar" style={{ width: '8rem' }} className="rounded-circle" src={author.avatarURL}/>
                </div>
                 <div  ><h4 className="text-danger" > {author.name} Asks:</h4></div>
                 <h3 className='text-success'>Would You Rather?!!!</h3>
                 <form onSubmit= {(e)=>this.handleSubmit(e)} >
                                <div>
                                    <div >
                                       
                                        <input  type="radio" value="optionOne"
                                            onClick= {(e)=> this.choosenRadio("optionOne")}/>
                                             <span>{optionOne}</span>
                                       
                                    </div>
<br/>

                                    <div >
                                        
                                        <input type="radio" 
                                            
                                            value="optionTwo"
                                            onClick={ (e)=>this.choosenRadio("optionTwo")}/>
                                            <span>{optionTwo}</span>
                                      
                                    </div>
                                </div>
                                <hr/>
                                <Button className="btn btn-success" type='submit'>SAVE</Button>
                            </form>




                 </div>
                ):(
                    <div>
                         <div>
                    <img alt="avatar" style={{ width: '8rem' }} className="rounded-circle" src={author.avatarURL}/>
                </div>
                 <div  ><h4 className="text-danger" > {author.name} Asked:</h4></div>
                       <div><h4 className='text-danger'>Votes: </h4>  </div>
                        <div className={optionOneAnswered? "p-3 mb-2 bg-danger text-white" :"p-3 mb-2 bg-light text-dark" }>
                            <h3>{optionOne}</h3>

                            
                                <div>{optionOneVotes} from {totalVotes} votes</div>
                                <div>Percentage votes: {percentageOptionOne}%</div>
                            
                        
                        </div>

                        <div className={optionTwoAnswered ?"p-3 mb-2 bg-danger text-white" :"p-3 mb-2 bg-light text-dark" }>
                            <h3>{optionTwo}</h3>
                            
                                <div>{optionTwoVotes} from {totalVotes} votes</div>
                                <div>Percentage votes: {percentageOptionTwo}%</div>
                            
                            
                        </div> 
                    </div>
                )
                








                }

















                </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, props) {
    const { id } =props.match.params
    const question = questions[id]
    const author = question ? users[question.author] : null
    const optionOne = question.optionOne.text
    const optionTwo = question.optionTwo.text
    const optionOneAnswered = question.optionOne.votes.includes(authedUser) 
    const optionTwoAnswered = question.optionTwo.votes.includes(authedUser) 
    const hadAnswered = optionOneAnswered || optionTwoAnswered
    const optionOneVotes = question.optionOne.votes.length 
    const optionTwoVotes = question.optionTwo.votes.length 
    const totalVotes = optionTwoVotes + optionOneVotes
    const percentageOptionOne = ((optionOneVotes / totalVotes) *100).toFixed(0)
    const percentageOptionTwo =( (optionTwoVotes / totalVotes) *100).toFixed(0)
    

    
    
  
    return {
        id,
        authedUser,
        question,
        author,
        optionOneAnswered,
        optionTwoAnswered,hadAnswered,
        
        percentageOptionOne,
        percentageOptionTwo,
        totalVotes,
        optionTwoVotes,
        optionOneVotes,
        optionOne,
        optionTwo,
    }
}


export default connect(mapStateToProps)(QuestionDetail);

