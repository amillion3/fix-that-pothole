import React from 'react';
import {Link} from 'react-router-dom';

import authRequests from '../../firebaseRequests/auth';

import './Register.css';

class Register extends React.Component {
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
      .fbRegisterUser(user)
      .then(() => {
        this.props.history.push('/login');
      })
      .catch(error => {
        console.error('Error with registering, ', error);
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
      <div className='div-register-container col-xs-offset-3 col-xs-6'>
        <h3 className='text-center'>Register New User</h3>
        <form>
          <label htmlFor="inputEmail">Email:</label>
          <input
            type="email"
            className="form-control landing-page-input"
            id="inputEmail"
            placeholder="Email to Register with"
            value={user.email}
            onChange={this.emailChange} />
          <label htmlFor="inputPassword">Password:</label>
          <input
            type="password"
            className="form-control landing-page-input"
            id="inputPassword"
            placeholder="Enter New Password"
            value={user.password}
            onChange={this.passwordChange} />
        </form>
        <button
          type="submit"
          className='btn btn-default btn-lg col-xs-12 landing-page-button'
          onClick={this.handleButtonClick}>
          <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
          Register
        </button>
        <div className='text-center'>
          <Link to='/login'>Need to log in?</Link>
        </div>
      </div>
    );
  }
};

export default Register;
