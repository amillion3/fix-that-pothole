import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import firebase from 'firebase';

import Register from '../Components/Register/Register';
import Login from '../Components/Login/Login';
import Navbar from '../Components/Navbar/Navbar';
import Dashboard from '../Components/Dashboard/Dashboard';
import firebaseApp from '../firebaseRequests/connection';

import './App.css';

firebaseApp();

const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/map', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false});
      }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  userWantsToLogOut = () => {
    this.setState({authed: false});
  };

  render () {
    return (
      <BrowserRouter>
        <div>
          <Navbar
            authed={this.state.authed}
            userWantsToLogOut={this.userWantsToLogOut}
          />
          <div className='overall-container'>
            <Switch>
              <Route exact path='/' component={Login}/>
              <PublicRoute
                path='/register'
                authed={this.state.authed}
                component={Register} />
              <PublicRoute
                path='/login'
                authed={this.state.authed}
                component={Login} />
              <PrivateRoute
                path='/map'
                authed={this.state.authed}
                component={Map} />
              <PrivateRoute
                path='/dashboard'
                authed={this.state.authed}
                component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
