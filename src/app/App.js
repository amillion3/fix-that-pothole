import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import firebase from 'firebase';

import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlLayerTile from 'ol/layer/tile';
import OlSourceOsm from 'ol/source/osm';
import {MapComponent} from '@terrestris/react-geo';

import Register from '../Components/Register/Register';
import Login from '../Components/Login/Login';
import Home from '../Components/Home/Home';
import Navbar from '../Components/Navbar/Navbar';
import MainComponent from '../Components/MainComponent/MainComponent';
import fbConnection from '../firebaseRequests/connection';

import './App.css';
import 'ol/ol.css';
import 'antd/dist/antd.css';
// import './react-geo.css';
fbConnection();

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
            to={{ pathname: '/home', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

// center coordinates are in EPSG:3857
const center = [ -9657703.280456, 4318894.518143 ];

const layer = new OlLayerTile({
  source: new OlSourceOsm(),
});

const map = new OlMap({
  view: new OlView({
    center: center,
    zoom: 16,
  }),
  layers: [layer],
});

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <Navbar />
        <div className='overall-container'>
          <Switch>
            <Route path='/' exact component={Home}/>
            <PublicRoute
              path='/register'
              authed={this.state.authed}
              component={Register} />
            <PublicRoute
              path='/login'
              authed={this.state.authed}
              component={Login} />
            <PrivateRoute
              path='/main'
              authed={this.state.authed}
              component={MainComponent} />
          </Switch>
        </div>
      </BrowserRouter>
      // <div className="App">
      //   <h1>Fix That Pothole</h1>
      //   <MapComponent
      //     map={map}
      //   />
      // </div>
    );
  }
}

export default App;
