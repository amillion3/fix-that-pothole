import React from 'react';

import upvoteRequests from '../../firebaseRequests/upvoteRequests';
import auth from '../../firebaseRequests/auth';

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
          loggedInUser: auth.fbGetUid(),
        });
        console.log('this state',this.state.singlePothole);
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


  render () {
    const upvoteCount = this.state.singlePothole.upvoteCount;

    const verifyVoteCapability = voteType => {
      const upvoters = this.state.singlePothole.upvoteUserIds;
      const downvoters = this.state.singlePothole.downvoteUserIds;
      const loggedInUser = this.state.loggedInUser;
      debugger;
      let canVote = true;

      if (voteType === "span-dn-vote") {
        for (let d = 0; d < downvoters.length; d++) {
          if (downvoters[d] === loggedInUser) {
            canVote = false;
          }
        }
      } else if (voteType === "span-up-vote") {
        for (let u = 0; u < upvoters.length; u++) {
          if (upvoters[u] === loggedInUser) {
            canVote = false;
          }
        }
      } else {
        canVote = false;
      };
      return canVote;
    };

    //TODO
    // check if user can upvote/downvote
    // let upvoteObject = upvoteRequests.upvoteGET(details);
    // if user exists in upvoteUserIds, can only downvote
    // if user exists in downvoteuserIds, can only upvote
    // if user does not exist in either, they can
    //    upvote or downvote
    // special considerations for the creator of the pothole?

    // This updates state needed after a valid up/downvote
    const updateState = temp => {
      return new Promise((resolve, reject) => {
        upvoteRequests
          .upvotePUT(temp.firebaseId, temp)
          .then(res => {
            console.log('res data',res.data);
            this.setState({
              singlePothole: res.data,
            });
            return upvoteRequests.upvoteGET(res.data.firebaseId);
          })
          .then(updatedState => {
            this.setState({
              singlePothole: updatedState,
            });
            resolve (updatedState);
          })
          .catch(err => {
            reject (err);
          });
      });
    };

    // Starts the up/down vote process and checking
    const modifyUpDownVotes = e => {
      const voteCapability = verifyVoteCapability(e.target.id);
      const theCurrentUser = this.state.loggedInUser;
      console.log('vote cap', voteCapability);
      console.log('e.target.id', e.target.id);

      // problem with these if else if (voteCapability && e.target.id ===...)
      // i think the check of 119 should be done earlier in the cod
      if (voteCapability && e.target.id === "span-dn-vote") {
        // make a downvote
        const temp = this.state.singlePothole;

        temp.upvoteCount = temp.upvoteCount - 1;
        temp.downvoteUserIds.push(theCurrentUser);
        console.log('temp.upvoteUserIds',temp.upvoteUserIds);
        console.log('loggedinuser', theCurrentUser);
        console.log('find a match?', temp.upvoteUserIds.indexOf(theCurrentUser));
        if (temp.upvoteUserIds.indexOf(theCurrentUser)) {
          console.log('match!!');
          const tempIndex = temp.upvoteUserIds.indexOf(theCurrentUser);
          temp.upvoteUserIds.splice(tempIndex, 1);
          if (!temp.upvoteUserIds) {
            temp.upvoteUserIds = [];
          }
        }
        // add to downvote object and update state
        updateState(temp);
      } else if (voteCapability && e.target.id === "span-up-vote") {
        // make an upvote
        const temp = this.state.singlePothole;

        temp.upvoteCount = temp.upvoteCount + 1;
        temp.upvoteUserIds.push(theCurrentUser);

        if (temp.downvoteUserIds.indexOf(theCurrentUser)) {
          const tempIndex = temp.downvoteUserIds.indexOf(theCurrentUser);
          temp.downvoteUserIds.splice(tempIndex, 1);
          if (!temp.downvoteUserIds) {
            temp.downvoteUserIds = [];
          }
        }
        // add to upvote object and update state
        updateState(temp);
      }

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
