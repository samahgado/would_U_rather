
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import authedUser from './../reducers/autheduser';

class Leaderboard extends Component {
    render() {
        const { users,leaderInfo,authedUser} = this.props
    

        return (
            <div className=' d-flex justify-content-center'>
                <ol className="text-danger" >
                    {leaderInfo.map((user) => (
                <li key={user.uid}>


<Card style={{ width: '14rem' }} className="border border-danger">
  <Card.Img variant="top" src={users[user.uid].avatarURL} className="rounded-circle" />
  <Card.Body>
    <Card.Title> {users[user.uid].name}</Card.Title>
   
    <Card.Text>
    Answered questions :{user.answeredQuestions}
    </Card.Text>
    <Card.Text>
     Created questions : {user.createdQuestions}
    </Card.Text>
     <Card.Text>
     Score : {user.createdQuestions + user.answeredQuestions}
    </Card.Text>
  </Card.Body>
</Card>



                </li>
                
                

))}

<br/>


</ol>

   







                




                </div>
		        
            
        )
    }
}

function mapStateToProps( { users ,authedUser}) {
    const leaderInfo = Object.keys(users).map(( uid) =>{
    return{
        uid,
        createdQuestions : users[uid].questions.length,
        answeredQuestions : Object.keys(users[uid].answers) .length,
        
    }
}
    ).sort((a, b) => (b.createdQuestions + b.answeredQuestions) - (a.createdQuestions + a.answeredQuestions))
    return{
        users,
        leaderInfo,
        authedUser
    
    }

}

export default connect(mapStateToProps)(Leaderboard);