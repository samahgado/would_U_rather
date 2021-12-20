
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'

class Leaderboard extends Component {
    render() {
        const { users,leaderInfo} = this.props
       // const sortedUsers = users.sort( (a, b) => b.totalScore - a.totalScore)

        return (
            <div className=' d-flex justify-content-center'>
                <ul>
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


</ul>

   







                




                </div>
		        
            
        )
    }
}

function mapStateToProps( { users }) {
    const leaderInfo = Object.keys(users).map(( uid) =>{
    return{
        uid,
        createdQuestions : users[uid].questions.length,
        answeredQuestions : Object.keys(users[uid].answers) .length,
        
    }
}
    )
    return{
        users,
        leaderInfo,
    
    }

}

export default connect(mapStateToProps)(Leaderboard);