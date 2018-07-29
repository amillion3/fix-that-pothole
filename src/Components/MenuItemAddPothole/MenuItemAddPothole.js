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
          className = 'col-xs-5 btn btn-large btn-warning menu-items-btn'
          onClick={this.eventAddNewPothole}
        >Report New Pothole</button>
        <button
          className = 'col-xs-5 col-xs-offset-2 btn btn-large btn-info menu-items-btn'
          onClick={this.eventDashboard}
        >View Dashboard</button>
      </div>

    );
  }
};

export default MenuItemAddPothole;
