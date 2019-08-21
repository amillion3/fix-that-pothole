import React from 'react';

import upvoteRequests from '../../firebaseRequests/upvoteRequests';

import './Upvotes.css';

class Upvotes extends React.Component {
  state = {
    singlePothole: {},
  }

  componentWillMount () {
    const { details } = this.props;
    upvoteRequests
      .upvoteGET(details.id)
      .then(singlePotholeResponse => {
        this.setState({
          singlePothole: singlePotholeResponse,
        });
      })
      .catch(err => console.error('Error with upvote get request: ', err));
  };

  // users cannot up/downvote more than once
  // users who created pothole cannot up/downvote more than once
  verifyUpvoteCapability = () => {
    // let upvoteObject = upvoteRequests.upvoteGET(details);
    // if user exists in upvoteUserIds, can only downvote
    // if user exists in downvoteuserIds, can only upvote
    // if user does not exist in either, they can
    //    upvote or downvote
    // special considerations for the creator of the pothole?
  }

  // pass in details instead of referencing the this.props?
  getUpvoteCount = () => {
    if (this.state !== null) {
      return this.state.singlePothole.upvoteCount;
    }
    else {
      return "N/A";
    }
  };

  // const updateUpvoteCount = modifier => {
  //   // modifier should be a 1 or -1 only
  //   let canUpvote = false;
  //   if (details !== null &&
  //     (modifier === -1 || modifier === 1)) {
  //     canUpvote = verifyUpvoteCapability();
  //   }
  //   if (canUpvote) {
  //     let existingUpvotes = upvoteRequests.upvoteGET(details.upvoteCount);
  //     existingUpvotes += modifier;
  //     details.upvoteCount = existingUpvotes;
  //     upvoteRequests.upvotePUT(details.id, existingUpvotes);
  //   }
  // };

  render () {
    const upvoteCount = this.state.singlePothole.upvoteCount || 1;
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
