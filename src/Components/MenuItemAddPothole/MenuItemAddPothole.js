import React from 'react';

import './MenuItemAddPothole.css';

class MenuItemAddPothole extends React.Component {
  eventAddNewPothole = e => {
    console.log(e);
  };
  render () {
    return (
      <div className='col-xs-12 menu-items'>
        <button
          className = 'col-xs-6 btn btn-large btn-warning'
          onClick={this.eventAddNewPothole}
        >Report New Pothole</button>
        <button
          className = 'col-xs-6 btn btn-large btn-info'
          onClick={this.eventDashboard}
        >View Dashboard</button>
      </div>

    );
  }
};

export default MenuItemAddPothole;
