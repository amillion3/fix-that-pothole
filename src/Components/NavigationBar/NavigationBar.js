import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import authRequests from '../../firebaseRequests/auth';

import './NavigationBar.css';

class NavigationBar extends React.Component {
  render () {
    const {authed, userWantsToLogOut} = this.props;

    const logoutClicked = () => {
      authRequests.fbLogoutUser();
      userWantsToLogOut();
    };

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <img className='navbar-brand navbar-position'src='https://www.andymillion.com/fix-that-pothole/potholesymbol.png' alt='icon' />
            {
              authed ? (
                <Link to='/map' className='navbar-brand' id='navbar-brand-text'>Fix That <span className='brand-bold'>Pothole</span></Link>
              ) : (
                <Link to='/login' className='navbar-brand' id='navbar-brand-text'>Fix That Pothole</Link>
              )
            }
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {
              authed ? (
              // USER IS LOGGED IN
                <Nav className="nav navbar-nav navbar-right">
                  <NavItem>
                    <Link to='/map'>
                      <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                    Map
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link to='/dashboard'>
                      <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
                    Dashboard
                    </Link>
                  </NavItem>
                  <NavItem onClick={logoutClicked}>
                    <Link to='/login'>
                      <span className="glyphicon glyphicon-log-out" aria-hidden="true"></span>
                    Logout
                    </Link>
                  </NavItem>
                </Nav>
              ) : (
                // USER IS NOT LOGGED IN
                <Nav className="nav navbar-nav navbar-right">
                  <NavItem><Link to='/login'>
                    <span className="glyphicon glyphicon-log-in" aria-hidden="true"></span>
                  Login
                  </Link></NavItem>
                </Nav>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default NavigationBar;
