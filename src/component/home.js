import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab ,Tabs} from 'react-bootstrap';

import { handleInitialData } from './../action/shared';
import Question from './question';
class Home extends React.Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
}
    render() { 
      const { answeredQuesions, unAnsweredQuestions} = this.props
      
        return <div className='container'>
            
            <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="unanswered" title="UnAnswered"   >
    {
      Object.keys(unAnsweredQuestions).length !== 0
      ? <div >
          {unAnsweredQuestions.map((id) => (
          <Question key={id} id={id}/> ))}
      </div>      : null
    }
  </Tab>
  <Tab eventKey="Answered" title="Answered">
    {
      Object.keys(answeredQuesions).length !== 0
      ? <div >
          {answeredQuesions.map((id) => (
          <Question key={id} id={id}/> ))}
      </div>     
      : null
    }
  </Tab>
  
</Tabs>
        </div>;
    }
}
 
function mapStateToProps ({ questions, authedUser, users}) {
  const user = users[authedUser]

  const answeredQuesions = Object.keys(questions).length !== 0
      ? Object.keys(user.answers)
          .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
      : []

  const unAnsweredQuestions = Object.keys(questions).length !== 0
      ? Object.keys(questions)
          .filter(questionId => !answeredQuesions.includes(questionId))
          .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
      : []

  return {
      answeredQuesions,
      unAnsweredQuestions,
      
  }
}
export default connect(mapStateToProps) (Home);