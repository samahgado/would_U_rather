import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { setAuthedUser } from '../action/authedUser'
import { withRouter } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { Image } from 'react-bootstrap'


    
class Nav extends Component {
    handleLogOut = (props) => {
        const {  history,dispatch} = this.props
        dispatch(setAuthedUser(null))
        history.push('/')
    }
    
    
    
    render() {
        const { user, authedUser } = this.props
        const avatar = user ? user.avatarURL : 'placeholder.png'
        const name = user ? user.name : ''
        return (<div>

<nav className="navbar navbar-expand-lg navbar-light bg-light container">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
      <NavLink to='/home' exact activeClassName='active'className="nav-link">  
                        Home
                    </NavLink>
      </li>
      <li className="nav-item">
      <NavLink to='/add' exact activeClassName='active' className="nav-link">   
                        New Question
                    </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to='/leaderboard' exact activeClassName='active' className="nav-link">  
                        Leader Board
                    </NavLink> 
      </li>
      
    </ul>
  </div>
  {
      authedUser && 
      <div>
        <Image src={avatar}  alt="avatar" style={{ width: '4rem' }} className="rounded-circle" />
      <span >
      hello {name}
    </span>
    <Button variant="danger" onClick={this.handleLogOut}>Log Out</Button>
    </div>
  }
</nav>

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

export default withRouter( connect(mapStateToProps)(Nav))