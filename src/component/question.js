import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
class Question extends Component {
    
    render() {
        const {question ,author} = this.props

     
       
        const { id } = this.props

        return (
            <Link to={`/questions/${id}`} >
            <div >
                <h5>{author.name} asks:</h5>
            </div>
            <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={author.avatarURL} className="rounded-circle"/>
        <Card.Body>
          <Card.Title>Would You Rather </Card.Title>
          <Card.Text>
            {question.optionOne.text}
          </Card.Text>
          <div>OR</div>
          <Card.Text>
          {question.optionTwo.text}
          </Card.Text>
        </Card.Body>
      </Card>
          
        </Link>
       
        )
    }
}
    


function mapStateToProps ({authedUser, users, questions}, { id }) {
    const question = questions[id]
    const author = question ? users[question.author] : null
  
    return {
        authedUser,
        question,
        author,
    }
}

export default connect(mapStateToProps)(Question);