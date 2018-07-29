import React from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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
            <img className='navbar-brand navbar-img-brand'src='https://www.andymillion.com/fix-that-pothole/potholesymbol.png' alt='icon' />
            {
              authed ? (
                <Link to='/map' className='navbar-brand'>Fix That Pothole</Link>
              ) : (
                <Link to='/login' className='navbar-brand'>Fix That Pothole</Link>
              )
            }
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
          {
            authed ? (
              // USER IS LOGGED IN
              <Nav className="nav navbar-nav navbar-right">
                <NavItem>
                  <Link to='/map'>Map</Link></NavItem>
                <NavItem>
                  <Link to='/dashboard'>Dashboard</Link></NavItem>
                <NavItem><Link to='/login'>
                  <button
                    onClick={logoutClicked}
                  >
                  Logout</button></Link></NavItem>
              </Nav>
            ) : (
              // USER IS NOT LOGGED IN
              <Nav className="nav navbar-nav navbar-right">
                <NavItem><Link to='/login'>Login</Link></NavItem>
              </Nav>
            )
          }
          </Nav>
          <Nav pullRight>
          {
            authed ? (
              // USER IS LOGGED IN
              <Nav className="nav navbar-nav navbar-right">
                <NavItem>
                  <Link to='/map'>Map</Link></NavItem>
                <NavItem>
                  <Link to='/dashboard'>Dashboard</Link></NavItem>
                <NavItem><Link to='/login'>
                  <button
                    onClick={logoutClicked}
                  >
                  Logout</button></Link></NavItem>
              </Nav>
            ) : (
              // USER IS NOT LOGGED IN
              <Nav className="nav navbar-nav navbar-right">
                <NavItem><Link to='/login'>Login</Link></NavItem>
              </Nav>
            )
          }
          </Nav>
        </Navbar.Collapse>
      </Navbar>;
      // <Navbar className="navbar navbar-default">
      //   <div className="container-fluid">
      //     <div className="navbar-header">
      //       <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      //         <span className="sr-only">Toggle navigation</span>
      //         <span className="icon-bar"></span>
      //         <span className="icon-bar"></span>
      //         <span className="icon-bar"></span>
      //       </button>
      //       <img className='navbar-brand navbar-img-brand'src='https://www.andymillion.com/fix-that-pothole/potholesymbol.png' alt='icon' />
      //       {
      //         authed ? (
      //           <Link to='/map' className='navbar-brand'>Fix That Pothole</Link>
      //         ) : (
      //           <Link to='/login' className='navbar-brand'>Fix That Pothole</Link>
      //         )
      //       }

      //     </div>
      //     <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      //       {
      //         authed ? (
      //           // USER IS LOGGED IN
      //           <Nav className="nav navbar-nav navbar-right">
      //             <NavItem>
      //               <Link to='/map'>Map</Link></NavItem>
      //             <NavItem>
      //               <Link to='/dashboard'>Dashboard</Link></NavItem>
      //             <NavItem><Link to='/login'>
      //               <button
      //                 onClick={logoutClicked}
      //               >
      //               Logout</button></Link></NavItem>
      //           </Nav>
      //         ) : (
      //           // USER IS NOT LOGGED IN
      //           <Nav className="nav navbar-nav navbar-right">
      //             <NavItem><Link to='/login'>Login</Link></NavItem>
      //           </Nav>
      //         )
      //       }
      //     </div>
      //   </div>
      // </Navbar>
    );
  }
};

export default NavigationBar;
