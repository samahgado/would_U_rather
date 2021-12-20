import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { setAuthedUser, resetAuthedUser } from '../action/authedUser';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Container ,Row,Col,Image} from 'react-bootstrap';

class Login extends Component {
	state = {
		username: null,
		toHome: false,
	}
	
	handleSelect = (event) => {
		const username = event.target.value;
	
		this.setState( {username});
	}
	
	handleLogin = (event) => {
		const { username } = this.state;
		const { dispatch } = this.props;
	
		dispatch(setAuthedUser(username));
	
		this.setState( {toHome: true,
		  
		});
	}
	
	componentDidMount() {
		this.props.dispatch(resetAuthedUser())
	}

    render() {
		const { username, toHome } = this.state;
		const { users } = this.props;
		
		const userSelected = username ? username : -1

		
		if(toHome) {
			return <Redirect to='/home' />
		}
        
        return (
		    <div className=' d-flex justify-content-center'>
		        
		        
			
					<div>
                    <h1>Who Are You?!!!</h1>
					<div > <Container>
  <Row>
    
    <Col xs={2} md={1}>
      <Image src={"https://en.islcollective.com/preview/202004/f/would-you-rather-superhero-edition-fun-activities-games-games-oneonone-activities-war_124048_1.jpg"}  alt="avatar" style={{ width: '12rem' }} className="rounded-circle" />
    </Col>
    
  </Row>
</Container> </div>
                    <Form onSubmit={ this.handleLogin}>
                        <Form.Group controlId="exampleForm.ControlSelect1" >
                            <Form.Label>select a user</Form.Label>
                            <Form.Control as="select"  value={userSelected}  onChange={ this.handleSelect}>
							<option value="-1" disabled>Select user...</option>
							{Object.keys(users).map((id)=> {
							return (
								<option value={users[id].id} key={id}>
									{users[id].name}
								</option>
							);
						})}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={username === null} >
                            Login
                </Button>
                    </Form>
                </div>
			
</div>
				
				

		);  
    }
}

function mapStateToProps ({users}) {  
    return {
      users,
    };
  }

export default withRouter(connect(mapStateToProps)(Login));

