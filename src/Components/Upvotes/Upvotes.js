import React from 'react';

import upvoteRequests from '../../firebaseRequests/upvoteRequests';
import auth from '../../firebaseRequests/auth';

import './Upvotes.css';

class Upvotes extends React.Component {

  componentWillMount () {
    // const { details } = this.props;
    // const theCurrentUser = auth.fbGetUid();
    // console.log('details', details);
    // console.log('current user', theCurrentUser);
  };

  getUpvoteCount = () => {
    // if (this.state !== null) {
    //   return this.state.singlePothole.upvoteCount;
    // }
    // else {
    //   return "N/A";
    // }
  };

  render () {
    const { details } = this.props;
    const theCurrentUser = auth.fbGetUid();
    const voteCount = details.voteCount;

    const removeLoggedInUserFromVoting = () => {

    };

    const verifyVoteCapability = voteType => {
      let upvoters = details.userWhoUpvoted;
      let downvoters = details.userWhoDnvoted;
      const loggedInUser = theCurrentUser;
      let canVote = true;

      console.log('upvoters', upvoters);
      console.log('downvoters', downvoters);

      if (!upvoters) {
        upvoters = [""];
      }
      if (!downvoters) {
        downvoters = [""];
      }

      if (voteType === "span-dn-vote") {
        for (let d = 0; d < downvoters.length; d++) {
          if (downvoters[d] === loggedInUser) {
            canVote = false;
          }
        }
        if (canVote) {
          removeLoggedInUserFromVoting();
        }

      } else if (voteType === "span-up-vote") {
        for (let u = 0; u < upvoters.length; u++) {
          if (upvoters[u] === loggedInUser) {
            canVote = false;
          }
        }
        if (canVote) {
          removeLoggedInUserFromVoting();
        }
      } else {
        canVote = false;
      };

      return canVote;
    };

    // Starts the up/down vote process and checking
    //  Executed after user clicks up/down arrow
    const modifyUpDownVotes = e => {
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
            {voteCount}
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
