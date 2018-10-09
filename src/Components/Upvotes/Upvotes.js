import React from 'react';

import upvoteRequests from '../../firebaseRequests/upvoteRequests';

import './Upvotes.css';

class Upvotes extends React.Component {
  render () {
    const { details } = this.props;

    const getUpvoteCount = () => {
      if (details !== null) {
        const newData = upvoteRequests.upvoteGET(details);
        console.log("count", newData);
        return newData.upvoteCount;
      }
      else {
        return "N/A";
      }
    };

    const upvoteCount = getUpvoteCount();
    return (
      <div className="col-xs-12">
        <p>
          {upvoteCount}
          <span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
        </p>
      </div>
    );

  }
}

export default Upvotes;
