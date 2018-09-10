import React from 'react';

import './Legend.css';

class Legend extends React.Component {
  render () {
    return (
      <div className='col-xs-12' id='container-legend'>
        <div className='red text-center'>
          <img
            src="https://www.sandersbroscoffee.com/fix-that-pothole/red.svg"
            className="marker-icon-legend" alt="Newly Added" />
          <h4 className="text-center">Newly Added</h4>
        </div>
        <div className='purple text-center'>
          <img
            src="https://www.sandersbroscoffee.com/fix-that-pothole/purple.svg"
            className="marker-icon-legend" alt="Pothole Assigned" />
          <h4 className="text-center">Pothole Assigned</h4>
        </div>
        <div className='orange text-center'>
          <img
            src="https://www.sandersbroscoffee.com/fix-that-pothole/orange.svg"
            className="marker-icon-legend" alt="Pothole Fixed" />
          <h4 className="text-center">Pothole Fixed</h4>
        </div>
        <div className='yellow text-center'>
          <img
            src="https://www.sandersbroscoffee.com/fix-that-pothole/yellow.svg"
            className="marker-icon-legend" alt="Problem With Repair" />
          <h4 className="text-center">Problem With Repair</h4>
        </div>
      </div>
    );
  }
}

export default Legend;
