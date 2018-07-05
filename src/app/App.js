import React, { Component } from 'react';
import {SimpleButton} from '@terrestris/react-geo';
import '../../node_modules/antd/dist/antd.css';
// import '../../node_modules/react-geo.css';
import './App.css';

class App extends Component {
  render () {
    return (
      <SimpleButton onClick={() => { alert('hi'); }}>
        Hello World!
      </SimpleButton>
    );
  }
}

export default App;
