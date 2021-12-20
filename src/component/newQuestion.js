import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from  '../action/questions'
import { Form } from 'react-bootstrap';

class NewQuestion extends Component {	
	state = {      
    	optionOneText:'',
		optionTwoText:'',
		toHome: false
	};

	handleOption1 = (e)=>{
		e.preventDefault();
		this.setState({
			optionOneText:e.target.value
		})
	}
	handleOption2 = (e)=>{
		e.preventDefault();
		this.setState({
			optionTwoText:e.target.value
		})
	}
	

	handleSubmit = (event) => {   
    	event.preventDefault();

    	const { dispatch } = this.props
    	const { optionOneText, optionTwoText} = this.state   
    
    	dispatch(handleAddQuestion(
      		optionOneText,
      		optionTwoText
    	))

    	this.setState({
        	optionOneText:'',
			optionTwoText:'',
			toHome: true
      	})
  	}
 
	render() {
		const { toHome } = this.state;

		if (toHome) {
		
			return <Redirect to='/home' />
		}

		return (
			<div className=' d-flex justify-content-center'>
		        
			
				
				< div >
                    <h1>Would you rather?</h1>
                    
                 <br/>
                    
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group >
                            
                            <Form.Control name="option1" type="text" placeholder="option 1" onChange={this.handleOption1} />
                        </Form.Group>
<div><h3>OR</h3></div>
                        <Form.Group controlId="formBasicPassword">
                            
                            <Form.Control name="option2" type="text" placeholder="option 2" onChange={this.handleOption2} />
                        </Form.Group>
<br/>
                        <Button variant="danger" type="submit">
                            Submit
                </Button>
                    </Form>
                </div >
			</div> 
  		)
	}
}

export default connect()(NewQuestion);