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
import { Redirect } from 'react-router-dom';


class App extends Component {
	componentDidMount() {
	  this.props.dispatch(handleInitialData())
  }

  render() {
	const { user, authedUser } = this.props
	  return (
		  <div>
			<Nav/>  
		  
		 { authedUser && <Fragment>

		  
		  <Switch>
			  
			  <Route path='/home' component={Home}/>
			  
			  <Route path='/add' component={NewQuestion}/>
			  <Route path='/questions/:id' component={QuestionDetail} />
			   <Route path='/leaderboard' component={Leaderboard}/>
		  </Switch>
		  </Fragment> 
		  }: 
		  <Route path='/' exact component={Login}/>
		  
		  </div>
		  
	  )
  }
}

function mapStateToProps( { authedUser, users}, props) {
    return {
        authedUser,
        users,
        user: users[authedUser]
    }

}

export default connect(mapStateToProps)(App);
