import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import authRequests from '../../firebaseRequests/auth';

import './Login.css';

class Login extends React.Component {
  state = {
    user: {
      email: 'abc123@gmail.com',
      password: '123456',
    },
  };

  // Login button click
  handleButtonClick = e => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .fbLoginUser(user)
      .then(() => {
        this.props.history.push('/map');
      })
      .catch(err => console.error('Error logging in:', err));
  };

  // Dynamicaly updating email in this.state
  emailChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  // Dynamicaly updating password in this.state
  passwordChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  render () {
    const { user } = this.state;
    return (
      <div className='div-login-container col-xs-offset-3 col-xs-6'>
        <h3 className='text-center'>User Login</h3>
        <form>
          <label htmlFor="inputEmail">Email:</label>
          <input
            type="email"
            className="form-control landing-page-input"
            id="inputEmail"
            value={user.email}
            onChange={this.emailChange}
            placeholder="Email" />
          <label htmlFor="inputPassword">Password:</label>
          <input
            type="password"
            className="form-control landing-page-input"
            id="inputPassword"
            value={user.password}
            onChange={this.passwordChange}
            placeholder="Password" />
        </form>
        <button
          type="submit"
          className='btn btn-default btn-lg col-xs-12 landing-page-button'
          onClick={this.handleButtonClick}>
          <span className="glyphicon glyphicon-log-in" aria-hidden="true"></span>
          Login
        </button>
        <div className='text-center'>
          <Link to='/register'>Need to register?</Link>
        </div>
      </div>
    );
  }
};

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
