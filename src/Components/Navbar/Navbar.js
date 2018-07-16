import React from 'react';
import {Link} from 'react-router-dom';
import authRequests from '../../firebaseRequests/auth';

import './Navbar.css';

class Navbar extends React.Component {
  render () {

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
            <Link to='/' className='navbar-brand'>Fix That Pothole</Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to='/'>Link1</Link></li>
              <li><Link to='/'>Link2</Link></li>
              <li><Link to='/'>Link3</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
