import React from 'react';

class MenuItemAddPothole extends React.Component {
  eventAddNewPothole = e => {
    console.log(e);
  };
  render () {
    return (
      <div className='col-xs-12'>
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
