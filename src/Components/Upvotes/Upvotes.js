import React from 'react';

import upvoteRequests from '../../firebaseRequests/upvoteRequests';

import './Upvotes.css';

class Upvotes extends React.Component {
  render () {
    const { details } = this.props;

    // users cannot up/downvote more than once
    // users who created pothole cannot up/downvote more than once
    const verifyUpvoteCapability = () => {

    };

    // pass in details instead of referencing the this.props?
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

    const updateUpvoteCount = modifier => {
      // modifier should be a 1 or -1 only
      let canUpvote = false;
      if (details !== null &&
        (modifier === -1 || modifier === 1)) {
        canUpvote = verifyUpvoteCapability();
      }
      if (canUpvote) {
        let existingUpvotes = upvoteRequests.upvoteGET(details);
        existingUpvotes += modifier;
        upvoteRequests.upvotePUT(details, existingUpvotes);
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
