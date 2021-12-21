import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Home from './component/home';
import NewQuestion from './component/newQuestion';
import QuestionDetail from './component/questionDetail';
import Leaderboard from './component/leaderboard';
import NotFound from './component/notFound';
import { Route,Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { handleInitialData } from './action/shared';
import Nav from './component/nav';
import Login from './component/login';
import authedUser from './reducers/autheduser';
import { resetAuthedUser } from './action/authedUser';


class App extends Component {
	componentDidMount(){
		this.props.dispatch(handleInitialData())
	}
  render() {
	const { authedUser } = this.props
	  return (
		  <div>
			<Nav/>  
		  
		 {authedUser && 
		 
			 <Fragment>

		  
		  <Switch>
			  
			  <Route path='/home'  component={Home}/>
			  <Route path='/questions/:id' component={QuestionDetail} />
			  <Route path='/add' component={NewQuestion}/>
			  
			   <Route path='/leaderboard' component={Leaderboard}/>
		  </Switch>
		  </Fragment> 
		  }:<Route path='/' exact component={Login}/>
		 
		  <Route path='/notFound' component={NotFound}/>
		  
		  </div>
		  
	  )
  }
}

function mapStateToProps( { authedUser, users}, props) {
    return {
        authedUser,
        users,
        
    }

}

export default connect(mapStateToProps)(App);
