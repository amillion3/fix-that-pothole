import React from 'react';
import {Link} from 'react-router-dom';
import authRequests from '../../firebaseRequests/auth';

import './Navbar.css';

class Navbar extends React.Component {
  render () {
    const {authed, userWantsToLogOut} = this.props;

    const logoutClicked = () => {
      authRequests.fbLogoutUser();
      userWantsToLogOut();
    };

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <img className='navbar-brand navbar-img-brand'src='http://www.clker.com/cliparts/1/d/8/a/13167253271330505170Pothole Symbol.svg.thumb.png' alt='icon' />
            {
              authed ? (
                <Link to='/home' className='navbar-brand'>Fix That Pothole</Link>
              ) : (
                <Link to='/login' className='navbar-brand'>Fix That Pothole</Link>
              )
            }

          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {
              authed ? (
                // USER IS LOGGED IN
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to='/map'>Map</Link></li>
                  <li>
                    <Link to='/dashboard'>Dashboard</Link></li>
                  <li><Link to='/login'>
                    <button
                      onClick={logoutClicked}
                    >
                    Logout</button></Link></li>
                </ul>
              ) : (
                // USER IS NOT LOGGED IN
                <ul className="nav navbar-nav navbar-right">
                  <li><Link to='/login'>Login</Link></li>
                </ul>
              )
            }
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
