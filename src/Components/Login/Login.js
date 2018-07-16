import React from 'react';
import {Link} from 'react-router-dom';

import authRequests from '../../firebaseRequests/auth';

import './Login.css';

class Login extends React.Component {
  state = {
    user: {
      email: 'abc123@gmail.com',
      password: '123456',
    },
  };

  handleButtonClick = e => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .fbLoginUser(user)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch(error => {
        console.error('Error logging in, ', error);
      });
  };

  emailChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = e => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  render () {
    const { user } = this.state;
    return (
      <div className='div-login-container col-xs-offset-3 col-xs-6'>
        <h3 className='text-center'>Login</h3>
        <form>
          <label htmlFor="inputEmail">Email:</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            value={user.email}
            onChange={this.emailChange}
            placeholder="Email" />
          <label htmlFor="inputPassword">Password:</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            value={user.password}
            onChange={this.passwordChange}
            placeholder="Password" />
        </form>
        <button
          type="submit"
          className='btn btn-default'
          onClick={this.handleButtonClick}
        >
          Login
        </button>
        <Link to='/register'>Need to register?</Link>
      </div>
    );
  }
};

export default Login;
