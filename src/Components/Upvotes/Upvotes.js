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
        console.log(this.state);
      })
      .catch(err => console.error('Error with upvote get request: ', err));
  };

  // users cannot up/downvote more than once
  // users who created pothole cannot up/downvote more than once

  getUpvoteCount = () => {
    if (this.state !== null) {
      return this.state.singlePothole.upvoteCount;
    }
    else {
      return "N/A";
    }
  };

  // const modifyUpDownVotes = e => {
  //   // modifier should be a 1 or -1 only
  //   let canUpvote = false;
  //   console.log(e);
  // if (details !== null &&
  //   (modifier === -1 || modifier === 1)) {
  //   canUpvote = verifyUpvoteCapability();
  // }
  // if (canUpvote) {
  //   let existingUpvotes = upvoteRequests.upvoteGET(details.upvoteCount);
  //   existingUpvotes += modifier;
  //   details.upvoteCount = existingUpvotes;
  //   upvoteRequests.upvotePUT(details.id, existingUpvotes);
  // }
  // };

  render () {
    const upvoteCount = this.state.singlePothole.upvoteCount;

    const verifyVoteCapability = voteType => {
      let voteModifier = 0;
      if (voteType === "span-dn-vote") {
        voteModifier = -1;
      } else if (voteType === "span-up-vote") {
        voteModifier = 1;
      }

      //TODO
      // check if user can upvote/downvote


      // let upvoteObject = upvoteRequests.upvoteGET(details);
      // if user exists in upvoteUserIds, can only downvote
      // if user exists in downvoteuserIds, can only upvote
      // if user does not exist in either, they can
      //    upvote or downvote
      // special considerations for the creator of the pothole?
    };

    const modifyUpDownVotes = e => {
      console.log(e.target);
      const voteCapability = verifyVoteCapability(e.target.id);
      // TO DO check if user can up or down vote
    };

    return (
      <div className="">
        <div className="col-xs-3 align-vertical-center">
          <h3>
            <button
              type="button"
              className="btn"
              onClick={modifyUpDownVotes}
            >
              <span id ="span-up-vote" className="glyphicon glyphicon-arrow-up remove-padding" aria-hidden="true"></span>
            </button>
          </h3>
        </div>
        <div className="col-xs-6 text-center center align-vertical-center">
          <h2>
            {upvoteCount}
          </h2>
        </div>
        <div className="col-xs-3">
          <h3>
            <button
              type="button"
              className="btn"
              onClick={modifyUpDownVotes}
            >
              <span id="span-dn-vote" className="glyphicon glyphicon-arrow-down remove-padding" aria-hidden="true"></span>
            </button>
          </h3>
        </div>
      </div>
    );
  }
};

export default Upvotes;
