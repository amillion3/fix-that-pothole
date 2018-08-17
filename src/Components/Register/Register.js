import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import { FormErrors } from '../FormErrors/FormErrors';
import authRequests from '../../firebaseRequests/auth';

import './Register.css';

class Register extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
    },
  };

  // Register button clicked
  handleButtonClick = e => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .fbRegisterUser(user)
      .then(() => {
        this.props.history.push('/login');
      })
      .catch(err => console.error('Error with registering: ', err));
  };

  // handles all changes to register inputs
  handleUserInput = e => {
    const name = e.target.name;  // 'email' or 'password'
    const value = e.target.value;
    const temp = { ...this.state.user };
    temp[name] = value;
    this.setState({user: temp});
    this.validateField(name, value);
  }
  validateField (fieldName, value) {
    const fieldValidationErrors = this.state.user.formErrors;
    let emailValid = this.state.user.emailValid;
    let passwordValid = this.state.user.passwordValid;

    switch (fieldName) {
    case 'email':
      // checks to see if the user input is a valid email format
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.email = emailValid ? '' : ' is invalid.';
      break;
    case 'password':
      // checks to see if the user input is at least 6 characters long
      passwordValid = value.length >= 6;
      fieldValidationErrors.password = passwordValid ? '' : ' is too short.';
      break;
    default:
      break;
    }
    this.setState({user: {
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
    },
    });
  }

  render () {
    const { user } = this.state;
    return (
      <div className='div-register-container col-xs-offset-3 col-xs-6'>
        <h3 className='text-center'>Register New User</h3>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.user.formErrors} />
        </div>
        <form>
          <label htmlFor="inputEmail">Email:</label>
          <input
            type="email"
            className="form-control landing-page-input"
            id="inputEmail"
            name="email"
            placeholder="Email to Register with"
            value={user.email}
            onChange={this.handleUserInput} />
          <label htmlFor="inputPassword">Password:</label>
          <input
            type="password"
            className="form-control landing-page-input"
            id="inputPassword"
            name="password"
            placeholder="Enter New Password"
            value={user.password}
            onChange={this.handleUserInput} />
        </form>
        <button
          type="submit"
          className='btn btn-lg col-xs-12 landing-page-button'
          onClick={this.handleButtonClick}>
          <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
          Register
        </button>
        <div className='text-center'>
          <Link to='/login'>Need to log in?</Link>
        </div>
      </div>
    );
  }
};

Register.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Register;
