import React from 'react';
import PropTypes from 'prop-types';
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
            <img className='navbar-brand navbar-position'src='https://www.sandersbroscoffee.com/fix-that-pothole/blackArrow.png' alt='icon' />
            {
              authed ? (
                <Link to='/map' className='navbar-brand' id='navbar-brand-text'>Fix That <span className='brand-bold'>Pothole</span></Link>
              ) : (
                <Link to='/login' className='navbar-brand' id='navbar-brand-text'>Fix That <span className='brand-bold'>Pothole</span></Link>
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
                  <NavItem componentClass='span' className='nav-item-wrapper'>
                    <Link to='/map'>
                      <span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
                    Map
                    </Link>
                  </NavItem>
                  <NavItem componentClass='span'  className='nav-item-wrapper'>
                    <Link to='/dashboard'>
                      <span className="glyphicon glyphicon-th-list" aria-hidden="true"
                      ></span>
                    Dashboard
                    </Link>
                  </NavItem>
                  <NavItem componentClass='span'
                    className='nav-item-wrapper' onClick={logoutClicked}>
                    <Link to='/login'>
                      <span className="glyphicon glyphicon-log-out" aria-hidden="true"></span>
                    Logout
                    </Link>
                  </NavItem>
                </Nav>
              ) : (
                // USER IS NOT LOGGED IN
                <Nav className="nav navbar-nav navbar-right">
                  <NavItem componentClass='span'>
                    <Link to='/login'>
                      <span className="glyphicon glyphicon-log-in" aria-hidden="true"></span>
                    Login
                    </Link>
                  </NavItem>
                </Nav>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

NavigationBar.propTypes = {
  authed: PropTypes.bool.isRequired,
  userWantsToLogOut: PropTypes.func.isRequired,
};

export default NavigationBar;
